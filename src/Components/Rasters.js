export default class Rasters {
  phase = 0;
  cnv;
  TMPrasterCTX;
  ctx;
  colorRaster = [
    "#DD5555",
    "#5555FF",
    "#55AA55",
    "#FF55FF",
    "#FF9955",
    "#5599FF",
  ];
  rasters = [];
  order = 0;
  rH = 20;
  constructor(ctx) {
    this.ctx = ctx;
    this.cnv = ctx.canvas;

    const TMPrasterCanvas = document.createElement("canvas");
    TMPrasterCanvas.width = ctx.canvas.width;
    TMPrasterCanvas.height = ctx.canvas.height;
    this.TMPrasterCTX = TMPrasterCanvas.getContext("2d");

    this.colorRaster.forEach(this.createRaster.bind(this));
  }

  createRaster(a) {
    const rasterCanvas = document.createElement("canvas");
    rasterCanvas.width = 1;
    rasterCanvas.height = this.cnv.height;
    const rasterCTX = rasterCanvas.getContext("2d");
    const grd = rasterCTX.createLinearGradient(0, this.rH, 0, 0);
    grd.addColorStop(0, a);
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, a);
    rasterCTX.fillStyle = grd;
    rasterCTX.fillRect(0, 0, this.cnv.width, this.rH);
    rasterCTX.zindex = 1;
    rasterCTX.order = this.order;

    this.rasters.push(rasterCTX);
    this.order++;
  }

  animate(time) {
    this.phase = time / 500;
    this.TMPrasterCTX.clearRect(0, 0, this.cnv.width, this.cnv.height);
    const center = (Math.sin(this.phase / 2) * this.cnv.height) / 4;

    for (let x = 0; x < this.rasters.length; x++) {
      const raster = this.rasters[x];

      const posY =
        this.cnv.height / 2 + Math.sin(this.phase + raster.order * this.rasters.length * 4) * 60;
      if (posY <= 351) {
        raster.zindex = 2;
      } else if (posY >= 401) {
        raster.zindex = 1;
      }
      this.TMPrasterCTX.drawImage(
        raster.canvas,
        0,
        posY,
        this.cnv.width,
        this.cnv.height
      );
    }
    this.ctx.drawImage(this.TMPrasterCTX.canvas, 0, center);

    this.rasters.sort(function (a, b) {
      return a.zindex - b.zindex;
    });
  }
  updateSize(ctx) {
    this.ctx = ctx;
    this.cnv = ctx.canvas;
  }
}
