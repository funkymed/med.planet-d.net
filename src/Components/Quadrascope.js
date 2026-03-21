const SCOPE_SIZE_SMALL = 80;
const SCOPE_SIZE_BIG = 320;
const MODE_SCOPES = 0;
const MODE_SPECTRUM = 1;
const MODE_BARS = 2;
const MODE_VU = 3;
const MODE_COUNT = 4;

// Pre-computed spectrum colors (128 bars)
const SPECTRUM_COLORS = [];
for (let i = 0; i < 128; i++) {
  const r = Math.round(Math.sin(i / 128 * 3.14) * 200 + 55);
  const b = Math.round(200 - (i / 128) * 200);
  SPECTRUM_COLORS.push(`rgba(${r},64,${b},0.7)`);
}

// Pre-computed bar colors: green at bottom -> yellow -> red at top (64 levels)
const BAR_COLORS = [];
for (let i = 0; i < 64; i++) {
  const t = i / 63; // 0 = bottom, 1 = top
  const r = Math.round(t < 0.5 ? t * 2 * 255 : 255);
  const g = Math.round(t < 0.5 ? 255 : (1 - (t - 0.5) * 2) * 255);
  BAR_COLORS.push(`rgb(${r},${g},0)`);
}

export default class Quadrascope {
  ctx;
  channelCount = 0;
  mode = MODE_SCOPES;
  expanded = false;
  _waveforms = [];
  _vuLevels = [];
  _vuPeaks = [];
  _cachedLayout = null;
  _cachedKey = "";
  _spectrumData = null;

  constructor(ctx) {
    this.ctx = ctx;
    for (let i = 0; i < 32; i++) {
      this._waveforms.push(new Float32Array(SCOPE_SIZE_BIG));
      this._vuLevels.push(0);
      this._vuPeaks.push(0);
    }
  }

  get scopeSize() {
    return this.expanded ? SCOPE_SIZE_BIG : SCOPE_SIZE_SMALL;
  }

  setChannelCount(count) {
    if (count === this.channelCount) return;
    this.channelCount = count;
    this._cachedLayout = null;
  }

  cycleMode() {
    this.mode = (this.mode + 1) % MODE_COUNT;
  }

  _readWaveforms(mixer) {
    if (!mixer) return;
    const scopeSize = this.scopeSize;
    const memory = mixer.memory;
    let chan = mixer.channels[0];
    let idx = 0;

    while (chan && idx < this.channelCount) {
      const wave = this._waveforms[idx];
      let peak = 0;

      // Amiga path (.mod files)
      if (chan.audena && chan.audper > 0 && memory && memory.length > 0) {
        const loc = chan.audloc;
        const ptr = chan.pointer;
        const len = chan.length;
        const end = ptr + len;
        const stride = Math.max(1, chan.audper >> 6);
        const vol = chan.audvol * 0.015625; // /64, range 0-1

        for (let s = 0; s < scopeSize; s++) {
          let pos = loc + s * stride;
          if (len > 0 && pos >= end) {
            pos = ptr + ((pos - ptr) % len);
          }
          if (pos >= 0 && pos < memory.length) {
            wave[s] = (memory[pos] | 0) * 0.0078125 * vol;
          } else {
            wave[s] = 0;
          }
        }
      }
      // Soundblaster path (.xm files)
      else if (chan.enabled && chan.sample && chan.sample.data) {
        const data = chan.sample.data;
        const len = data.length;
        const pos = chan.pointer || chan.index || 0;
        const vol = chan.volume || 0; // 0-1

        for (let s = 0; s < scopeSize; s++) {
          let p = pos + s;
          if (len > 0) {
            p = p % len;
            if (p < 0) p += len;
          }
          wave[s] = (data[p] || 0) * vol;
        }
      }
      // Silent
      else {
        wave.fill(0);
      }

      // Peak for VU
      for (let s = 0; s < scopeSize; s++) {
        const abs = wave[s] < 0 ? -wave[s] : wave[s];
        if (abs > peak) peak = abs;
      }

      // VU: volume with decay
      const vuLevel = peak;
      if (vuLevel > this._vuLevels[idx]) {
        this._vuLevels[idx] = vuLevel;
      } else {
        this._vuLevels[idx] *= 0.93;
      }
      if (vuLevel > this._vuPeaks[idx]) {
        this._vuPeaks[idx] = vuLevel;
      } else {
        this._vuPeaks[idx] *= 0.997;
      }

      chan = chan.next;
      idx++;
    }
  }

  _readSpectrum(player) {
    if (!player || !player.analyser) return;
    const analyser = player.analyser;
    const fb = analyser.frequencyBinCount;
    if (!this._spectrumData || this._spectrumData.length !== fb) {
      this._spectrumData = new Uint8Array(fb);
    }
    analyser.getByteFrequencyData(this._spectrumData);
  }

  _getLayout() {
    const canvasW = this.ctx.canvas.width;
    const canvasH = this.ctx.canvas.height;
    const count = this.channelCount || 4;
    const key = `${canvasW}_${canvasH}_${count}`;

    if (this._cachedLayout && this._cachedKey === key) return this._cachedLayout;

    let rows, cols;
    const isPortrait = canvasH > canvasW;

    if (isPortrait) {
      // Portrait: stack vertically
      if (count <= 4) { cols = 1; rows = count; }
      else if (count <= 8) { cols = 2; rows = Math.ceil(count / 2); }
      else { cols = 4; rows = Math.ceil(count / 4); }
    } else {
      // Landscape: spread horizontally
      if (count <= 4) { rows = 1; cols = count; }
      else if (count <= 8) { rows = 2; cols = Math.ceil(count / 2); }
      else { rows = 2; cols = Math.ceil(count / 2); }
    }

    this._cachedLayout = { rows, cols, cellW: canvasW / cols, cellH: canvasH / rows };
    this._cachedKey = key;
    return this._cachedLayout;
  }

  animate(player) {
    const { ctx } = this;
    if (!ctx) return;

    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    ctx.fillStyle = "#0a0a12";
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Always read waveforms for scopes and VU
    if (this.mode !== MODE_SPECTRUM && player && player.mixer) {
      this._readWaveforms(player.mixer);
    }

    if (this.mode === MODE_SCOPES) {
      this._drawScopes(canvasW, canvasH);
    } else if (this.mode === MODE_SPECTRUM) {
      this._readSpectrum(player);
      this._drawSpectrum(canvasW, canvasH);
    } else if (this.mode === MODE_BARS) {
      this._readSpectrum(player);
      this._drawBars(canvasW, canvasH);
    } else if (this.mode === MODE_VU) {
      this._drawVU(canvasW, canvasH);
    }
  }

  // === MODE 0: Scopes ===
  _drawScopes(canvasW, canvasH) {
    const ctx = this.ctx;
    const count = this.channelCount || 4;
    const layout = this._getLayout();
    const scopeSize = this.scopeSize;

    ctx.lineWidth = 1;

    for (let i = 0; i < count; i++) {
      const col = i % layout.cols;
      const row = Math.floor(i / layout.cols);
      const x = col * layout.cellW;
      const y = row * layout.cellH;
      const w = layout.cellW;
      const h = layout.cellH;
      const midY = y + h / 2;

      // Grid - vertical lines (8 divisions)
      ctx.strokeStyle = "rgba(77,159,255,0.06)";
      ctx.beginPath();
      for (let g = 1; g < 8; g++) {
        const gx = x + (w / 8) * g;
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + h);
      }
      // Grid - horizontal lines (4 divisions)
      for (let g = 1; g < 4; g++) {
        const gy = y + (h / 4) * g;
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
      }
      ctx.stroke();

      // Center line (brighter)
      ctx.strokeStyle = "rgba(77,159,255,0.12)";
      ctx.beginPath();
      ctx.moveTo(x, midY);
      ctx.lineTo(x + w, midY);
      ctx.stroke();

      // Center cross marks (small ticks at center)
      ctx.strokeStyle = "rgba(77,159,255,0.15)";
      ctx.beginPath();
      const cx = x + w / 2;
      ctx.moveTo(cx, midY - 6);
      ctx.lineTo(cx, midY + 6);
      ctx.stroke();

      // Border
      ctx.strokeStyle = "rgba(100,100,180,0.2)";
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

      // Channel number
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(77,159,255,0.4)";
      ctx.fillText(i + 1, x + 3, y + 12);
    }

    // Waveforms - dots + vertical connectors (step waveform)
    const dotSize = this.expanded ? 2 : 1;
    ctx.fillStyle = "#44ff88";
    ctx.strokeStyle = "#44ff88";
    ctx.lineWidth = this.expanded ? 1 : 0.5;
    for (let i = 0; i < count; i++) {
      const wave = this._waveforms[i];
      const col = i % layout.cols;
      const row = Math.floor(i / layout.cols);
      const x = col * layout.cellW;
      const y = row * layout.cellH;
      const w = layout.cellW;
      const h = layout.cellH;
      const midY = y + h / 2;
      const scaleX = w / scopeSize;
      const scaleY = h * 0.8;
      const yMin = y + 2;
      const yMax = y + h - 2;

      let prevPy = midY;
      ctx.beginPath();
      for (let s = 0; s < scopeSize; s++) {
        const px = x + s * scaleX;
        let py = midY - wave[s] * scaleY;
        if (py < yMin) py = yMin;
        else if (py > yMax) py = yMax;

        if (s > 0) {
          // Vertical line from previous Y to current Y (step shape)
          ctx.moveTo(px, prevPy);
          ctx.lineTo(px, py);
          // Horizontal line to next sample
          ctx.lineTo(px + scaleX, py);
        } else {
          ctx.moveTo(px, py);
          ctx.lineTo(px + scaleX, py);
        }
        prevPy = py;
      }
      ctx.stroke();

      // Dots on top
      for (let s = 0; s < scopeSize; s++) {
        const px = x + s * scaleX;
        let py = midY - wave[s] * scaleY;
        if (py < yMin) py = yMin;
        else if (py > yMax) py = yMax;
        ctx.fillRect(px, py, dotSize, dotSize);
      }
    }
  }

  // === MODE 1: Spectrum ===
  _drawSpectrum(canvasW, canvasH) {
    const ctx = this.ctx;
    const data = this._spectrumData;
    if (!data) return;

    const barCount = Math.min(data.length, 128);
    const barW = canvasW / barCount;

    for (let i = 0; i < barCount; i++) {
      const magnitude = (data[i] / 256) * (canvasH - 4);
      ctx.fillStyle = SPECTRUM_COLORS[i];
      ctx.fillRect(i * barW, canvasH - magnitude, barW - 1, magnitude);
    }
  }

  // === MODE 2: VU Meters ===
  _drawVU(canvasW, canvasH) {
    const ctx = this.ctx;
    const count = this.channelCount || 4;
    const barW = canvasW / count;
    const padding = 2;
    const innerW = barW - padding * 2;
    const maxBarH = canvasH - 16;

    ctx.font = "10px monospace";

    for (let i = 0; i < count; i++) {
      const x = i * barW + padding;
      const level = Math.min(1, this._vuLevels[i]);
      const peak = Math.min(1, this._vuPeaks[i]);
      const barH = level * maxBarH;
      const peakY = canvasH - 4 - peak * maxBarH;

      // Bar
      if (barH > 1) {
        const green = level < 0.6;
        const yellow = level >= 0.6 && level < 0.85;
        ctx.fillStyle = green ? "#44ff88" : yellow ? "#ffaa22" : "#ff4444";
        ctx.fillRect(x, canvasH - 4 - barH, innerW, barH);
      }

      // Peak marker
      if (peak > 0.01) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, peakY, innerW, 2);
      }

      // Channel number
      ctx.fillStyle = "rgba(77,159,255,0.5)";
      ctx.fillText(i + 1, x + 2, 12);

      // Separator
      ctx.fillStyle = "rgba(100,100,180,0.15)";
      ctx.fillRect(i * barW, 0, 1, canvasH);
    }
  }

  // === MODE 2: Classic spectrum bars (bass left, treble right, volume bottom-up) ===
  _drawBars(canvasW, canvasH) {
    const ctx = this.ctx;
    const data = this._spectrumData;
    if (!data) return;

    const barCount = 48;
    const gap = Math.max(1, Math.round(canvasW / barCount * 0.08));
    const barW = (canvasW - gap * barCount) / barCount;
    const maxH = canvasH - 4;
    const numSegments = 24;
    const segGap = Math.max(1, Math.round(maxH / numSegments * 0.1));
    const segH = (maxH - segGap * numSegments) / numSegments;

    for (let i = 0; i < barCount; i++) {
      const binIndex = Math.round((i / barCount) * Math.min(data.length, 128));
      const magnitude = data[binIndex] || 0;
      const level = magnitude / 256;
      const barH = level * maxH;
      const segments = Math.round(level * numSegments);
      const x = i * (barW + gap);

      for (let seg = 0; seg < segments; seg++) {
        const colorIdx = Math.round((seg / numSegments) * 63);
        const y = canvasH - 2 - (seg + 1) * (segH + segGap);
        ctx.fillStyle = BAR_COLORS[colorIdx];
        ctx.fillRect(x, y, barW, segH);
      }

      if (barH > 2) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillRect(x, canvasH - 2 - barH - 3, barW, 2);
      }
    }
  }

  reset() {
    this._cachedLayout = null;
    for (let i = 0; i < 32; i++) {
      this._vuLevels[i] = 0;
      this._vuPeaks[i] = 0;
    }
  }
}
