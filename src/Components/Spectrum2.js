import { getInnerSize } from "../tools/tools";

export default class Spectrum2 {
  ctx;
  speccolor;
  color;
  opacity;
  nbBar;
  analyser;
  linesCtx;
  linesCanvas;
  constructor(ctx, speccolor, color, opacity, nbBar, analyser) {
    this.ctx = ctx;
    this.speccolor = speccolor;
    this.color = color;
    this.opacity = opacity;
    this.nbBar = nbBar;
    this.analyser = analyser;
    this.createLines();
  }

  drawGradiant(ctx) {
    const size = getInnerSize();
    var gradient = ctx.createLinearGradient(0, 0, size.width, size.height);

    gradient.addColorStop(0, `#00000033`);
    gradient.addColorStop(0.5, `#AA550055`);
    gradient.addColorStop(1, `#00000033`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);
  }

  createLines() {
    const size = getInnerSize();
    this.linesCanvas = document.createElement("canvas");
    this.linesCanvas.width = size.width;
    this.linesCanvas.height = size.height;

    this.linesCtx = this.linesCanvas.getContext("2d");
    this.drawGradiant(this.linesCtx);
    const stroke = 1;
    for (let yy = 0; yy < size.height; yy += stroke * 2) {
      this.linesCtx.clearRect(0, yy, size.width, stroke);
    }
  }

  animate(clear) {
    if (!this.analyser) return false;
    var cW = this.ctx.canvas.width;
    var cH = this.ctx.canvas.height;

    this.nbBar = this.nbBar ? this.nbBar : 256;
    let SPACER_WIDTH = Math.round(cW / this.nbBar) + 1,
      BAR_WIDTH = SPACER_WIDTH,
      count = 0,
      fb = this.analyser.frequencyBinCount;

    BAR_WIDTH = BAR_WIDTH < 1 ? 1 : BAR_WIDTH;
    const freqByteData = new Uint8Array(fb);

    this.analyser.getByteFrequencyData(freqByteData);

    this.ctx.fillStyle = "rgba(" + this.speccolor + ",.8) ";
    for (let i = 0; i < cW; i += BAR_WIDTH) {
      let magnitude = freqByteData[count];
      magnitude = (magnitude / 256) * (cH - 50);
      const r = Math.round(Math.sin(count / this.nbBar) * 256);
      const v = 64;
      const b = Math.round(256 - (count / this.nbBar) * 256);
      this.ctx.fillStyle = `rgba(${r},${v},${b}, .5)`;

      const sourceX = count * (SPACER_WIDTH + 1);
      const sourceY = cH / 2 + magnitude / 2;
      const sourceW = BAR_WIDTH ? BAR_WIDTH : SPACER_WIDTH;
      const sourceH = magnitude ? -magnitude : 0.00001;

      const destX = sourceX; // - this.ctx.canvas.width / 2;
      const destY = sourceY; // - this.ctx.canvas.height / 2;

      this.ctx.drawImage(
        this.linesCanvas,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        destX,
        destY,
        sourceW,
        sourceH
      );

      count++;
    }
  }
}
