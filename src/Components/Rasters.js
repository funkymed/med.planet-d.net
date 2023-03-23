export default class Rasters {
  phase = 0;
  cnv;
  TMPrasterCTX;
  ctx;
  colorRaster = [
    "#FF5500",
    "#FF55FF",
    "#00BBFF",
    "#00BB00",
    /*"#FF55FF",
    "#FF9955",
    "#5599FF",*/
  ];
  rasters = [];
  order = 0;
  rH = 20;
  constructor(ctx) {
    this.ctx = ctx;
    this.cnv = ctx.canvas;
    this.createCanvasTmp();

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
    if (this.TMPrasterCTX) {
      this.phase = time / 500;
      this.TMPrasterCTX.clearRect(0, 0, this.cnv.width, this.cnv.height);
      const minY = this.cnv.height / 2;
      const maxY = this.cnv.height / 2 + this.rasters.length * 40;

      for (let x = 0; x < this.rasters.length; x++) {
        const raster = this.rasters[x];

        const posY =
          this.cnv.height / 2 +
          Math.sin(this.phase + raster.order * this.rasters.length * 2) * 40;

        if (Math.floor(posY) <= minY) {
          raster.zindex = 2;
        } else if (Math.ceil(posY) >= maxY) {
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
      this.ctx.drawImage(
        this.TMPrasterCTX.canvas,
        0, //-this.ctx.canvas.width / 2,
        320 //- this.ctx.canvas.height / 2
      );

      this.rasters.sort(function (a, b) {
        return a.zindex - b.zindex;
      });
    }
  }

  createCanvasTmp() {
    const TMPrasterCanvas = document.createElement("canvas");
    TMPrasterCanvas.width = this.cnv.width;
    TMPrasterCanvas.height = this.cnv.height;
    this.TMPrasterCTX = TMPrasterCanvas.getContext("2d");
  }

  updateSize(ctx) {
    this.ctx = ctx;
    this.cnv = ctx.canvas;
    this.createCanvasTmp();
  }
}
