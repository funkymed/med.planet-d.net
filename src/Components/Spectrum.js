export default function Spectrum(
  ctx,
  clear,
  speccolor,
  color,
  opacity,
  nbBar,
  analyser
) {
  if (!analyser) return false;
  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;
  //if (clear) {

  //}
  if (color) {
    //ctx.fillStyle = "rgba(" + color + ", " + (opacity ? opacity : 1) + ")";
    //ctx.fillRect(0, 0, cW, cH);
  }

  nbBar = nbBar ? nbBar : 256;
  var SPACER_WIDTH = Math.round(cW / nbBar),
    BAR_WIDTH = SPACER_WIDTH,
    count = 0,
    fb = analyser.frequencyBinCount;

  BAR_WIDTH = BAR_WIDTH < 1 ? 1 : BAR_WIDTH;
  var freqByteData = new Uint8Array(fb);

  analyser.getByteFrequencyData(freqByteData);

  ctx.fillStyle = "rgba(" + speccolor + ",.8) ";
  for (let i = 0; i < cW; i += BAR_WIDTH) {
    let magnitude = freqByteData[count];
    magnitude = (magnitude / 256) * (cH - 50);
    //ctx.fillStyle = "rgba("+(i)+","+(i)+","+(i)+", .2)";
    const r = Math.round(Math.sin(count / nbBar) * 256);
    const v = 64;
    const b = Math.round(256 - (count / nbBar) * 256);
    ctx.fillStyle = "rgba(" + r + "," + v + "," + b + ", .5)";
    ctx.fillRect(i, cH, BAR_WIDTH, -magnitude);
    count++;
  }
}
