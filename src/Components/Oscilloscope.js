import shader from "shader";

function drawLines(ctx, cW, cH, lineColor, nbLines, vertical) {
  const start = vertical ? cW / nbLines : cH / nbLines;
  const until = vertical ? cW - 1 : cH - 1;
  const seperator = vertical ? cW / nbLines : cH / nbLines;

  for (let r = start; r < until; r += seperator) {
    ctx.beginPath();

    if (vertical) {
      ctx.moveTo(r, 0);
      ctx.lineTo(r, cW);
    } else {
      ctx.moveTo(0, r);
      ctx.lineTo(cW, r);
    }
    ctx.strokeStyle = shader(lineColor, -0.5);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.strokeStyle = shader(lineColor, 0.5)+"33";
  if (vertical) {
    ctx.moveTo(cW / 2, 0);
    ctx.lineTo(cW / 2, cH);
  } else {
    // ctx.moveTo(0, cH/2);
    // ctx.lineTo(cW, cH/2);
  }
  ctx.stroke();
}

function gridContext(ctx, cW, cH, lineColor) {
  ctx.fillStyle = lineColor + "55";
  ctx.fillRect(0, 0, cW, cH);
  drawLines(ctx, cW, cH, lineColor, 6, false);
  drawLines(ctx, cW, cH, lineColor, 32, true);
}
export default class Oscilloscope {
  ctx;
  oscillocolor;
  color;
  opacity;
  analyser;
  constructor(ctx, oscillocolor, color, opacity, analyser) {
    this.ctx = ctx;
    this.oscillocolor = oscillocolor;
    this.color = color;
    this.opacity = opacity;
    this.analyser = analyser;
  }

  animate(clear) {
    if (!this.analyser) return false;
    var cW = this.ctx.canvas.width;
    var cH = this.ctx.canvas.height;
    
    // if (clear) {
    //   // this.ctx.clearRect(0, 0, cW, cH);
    // }
    
    const color = "#aa55aa";
    gridContext(this.ctx, cW, cH, color);

    // if (this.color) {
    //   this.ctx.fillStyle =
    //     "rgba(" + this.color + ", " + (this.opacity ? this.opacity : 1) + ")";
    //   this.ctx.fillRect(0, 0, cW, cH);
    // }

    var i,
      fb = this.analyser.frequencyBinCount;
    var freqByteData = new Uint8Array(fb);
    this.analyser.getByteTimeDomainData(freqByteData);
    this.ctx.fillStyle = this.oscillocolor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = shader(color, 0.15);
    for (i = 0; i < fb; i++) {
      var value_old = freqByteData[i - 1];

      var percent_old = value_old / 256;
      var height_old = cH * percent_old;
      var offset_old = cH - height_old - 1;
      var barWidth_old = cW / this.analyser.frequencyBinCount;

      var value = freqByteData[i];
      var percent = value / 256;
      var height = cH * percent;
      var offset = cH - height - 1;
      var barWidth = cW / this.analyser.frequencyBinCount;

      this.ctx.beginPath();
      this.ctx.moveTo(
        (i - 1) * barWidth_old, //- this.ctx.canvas.width / 2,
        offset_old //- this.ctx.canvas.height / 2
      );
      this.ctx.lineTo(
        i * barWidth, //- this.ctx.canvas.width / 2,
        offset //- this.ctx.canvas.height / 2
      );
      this.ctx.stroke();
    }
  }
}
