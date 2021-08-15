export default class Spectrum {
  ctx;
  speccolor;
  color;
  opacity;
  nbBar;
  analyser;
  constructor(ctx, speccolor, color, opacity, nbBar, analyser) {
    this.ctx = ctx;
    this.speccolor = speccolor;
    this.color = color;
    this.opacity = opacity;
    this.nbBar = nbBar;
    this.analyser = analyser;
  }
  animate(clear) {
    if (!this.analyser) return false;
    var cW = this.ctx.canvas.width;
    var cH = this.ctx.canvas.height;
    //if (clear) {

    //}
    if (this.color) {
      //ctx.fillStyle = "rgba(" + color + ", " + (opacity ? opacity : 1) + ")";
      //ctx.fillRect(0, 0, cW, cH);
    }

    this.nbBar = this.nbBar ? this.nbBar : 256;
    var SPACER_WIDTH = Math.round(cW / this.nbBar),
      BAR_WIDTH = SPACER_WIDTH,
      count = 0,
      fb = this.analyser.frequencyBinCount;

    BAR_WIDTH = BAR_WIDTH < 1 ? 1 : BAR_WIDTH;
    var freqByteData = new Uint8Array(fb);

    this.analyser.getByteFrequencyData(freqByteData);

    this.ctx.fillStyle = "rgba(" + this.speccolor + ",.8) ";
    for (let i = 0; i < cW; i += BAR_WIDTH) {
      let magnitude = freqByteData[count];
      magnitude = (magnitude / 256) * (cH - 50);
      //ctx.fillStyle = "rgba("+(i)+","+(i)+","+(i)+", .2)";
      const r = Math.round(Math.sin(count / this.nbBar) * 256);
      const v = 64;
      const b = Math.round(256 - (count / this.nbBar) * 256);
      this.ctx.fillStyle = "rgba(" + r + "," + v + "," + b + ", .5)";
      this.ctx.fillRect(
        count * SPACER_WIDTH,
        cH / 2 + magnitude / 2,
        BAR_WIDTH,
        -magnitude
      );
      count++;
    }
  }
}
