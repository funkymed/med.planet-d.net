import Star from "./Star";

// Source : https://codepen.io/chingy/pen/dyyRBwy

export default class Starfield {
  fps = 120;
  interval;
  lastTime;
  currentTime = 0;
  delta = 0;
  ctx;
  starsCount = 1500;
  stars = [];
  contextTMP;
  canvasTMP;
  force = 1;

  constructor(ctx) {
    this.ctx = ctx;

    this.canvasTMP = document.createElement("canvas");
    this.contextTMP = this.canvasTMP.getContext("2d");

    this.canvasTMP.width = this.ctx.canvas.width;
    this.canvasTMP.height = this.ctx.canvas.height;

    this.lastTime = new Date().getTime();
    this.interval = 1000 / this.fps;

    this.contextTMP.translate(
      this.canvasTMP.width / 2,
      this.canvasTMP.height / 2
    );
    document.addEventListener("keyup", this.forcePush.bind(this));
  }

  forcePush(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      this.force = 10;
    }
  }

  update(time) {
    const canvas = this.canvasTMP;

    const centerX = canvas.width ;
    const centerY = canvas.height;

    for (let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];
      star.update(this.force);

      if (
        star.x - star.z > centerX ||
        star.x + star.z < -centerX ||
        star.y - star.z > centerY / 2 ||
        star.y + star.z < -centerY / 2
      ) {
        star.reset();
      }
    }

    if (this.stars.length < this.starsCount)
      this.stars.push(new Star(this.contextTMP, this.force));

    if (this.force > 1) {
      this.force -= 0.1;
    } else if (this.force < 1) {
      this.force = 1;
    }
  }

  draw() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw();
    }
  }

  clear() {
    const canvas = this.contextTMP.canvas;
    this.contextTMP.clearRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
  }

  animate() {
    this.currentTime = new Date().getTime();
    const delta = this.currentTime - this.lastTime;

    if (delta > this.interval) {
      this.update();
      this.clear();
      this.draw();
      this.lastTime = this.currentTime - (delta % this.interval);
    }

    this.contextTMP.globalAlpha = 1;
    this.ctx.drawImage(
      this.canvasTMP,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }
}
