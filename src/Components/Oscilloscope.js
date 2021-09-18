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
    if (clear) {
      this.ctx.clearRect(0, 0, cW, cH);
    }
    if (this.color) {
      this.ctx.fillStyle =
        "rgba(" + this.color + ", " + (this.opacity ? this.opacity : 1) + ")";
      this.ctx.fillRect(0, 0, cW, cH);
    }
    var i,
      fb = this.analyser.frequencyBinCount;
    var freqByteData = new Uint8Array(fb);
    this.analyser.getByteTimeDomainData(freqByteData);
    this.ctx.fillStyle = this.oscillocolor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#FFFFFF50";
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
