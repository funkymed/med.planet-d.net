export default function Oscilloscope(ctx, clear, oscillocolor, color, opacity, analyser) {
  if (!analyser) return false;
  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;
  if (clear) {
    ctx.clearRect(0, 0, cW, cH);
  }
  if (color) {
    ctx.fillStyle = "rgba(" + color + ", " + (opacity ? opacity : 1) + ")";
    ctx.fillRect(0, 0, cW, cH);
  }
  var i,
    fb = analyser.frequencyBinCount;
  var freqByteData = new Uint8Array(fb);
  analyser.getByteTimeDomainData(freqByteData);
  ctx.fillStyle = oscillocolor;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  for (i = 0; i < fb; i++) {
    var value_old = freqByteData[i - 1];

    var percent_old = value_old / 256;
    var height_old = cH * percent_old;
    var offset_old = cH - height_old - 1;
    var barWidth_old = cW / analyser.frequencyBinCount;

    var value = freqByteData[i];
    var percent = value / 256;
    var height = cH * percent;
    var offset = cH - height - 1;
    var barWidth = cW / analyser.frequencyBinCount;

    ctx.beginPath();
    ctx.moveTo((i - 1) * barWidth_old, offset_old);
    ctx.lineTo(i * barWidth, offset);
    ctx.stroke();
  }
}
