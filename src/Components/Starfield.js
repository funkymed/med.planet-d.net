import Star from "./Star";

// Source : https://codepen.io/chingy/pen/dyyRBwy

export default class Starfield {
  fps = 60;
  interval;
  lastTime;
  currentTime = 0;
  delta = 0;
  ctx;
  starsCount = 2500;
  starsMinSpeed = 0.02;
  starsMaxSpeed = 0.02;
  starsSpeed;
  stars = [];

  constructor(ctx) {
    this.ctx = ctx;
    this.starsSpeed = this.starsMinSpeed;
    this.lastTime = new Date().getTime();
    this.interval = 1000 / this.fps;
    
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
  }

  update() {
    const canvas = this.ctx.canvas;
    for (let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];
      star.update();

      if (
        star.x - star.z > canvas.width / 2 ||
        star.x + star.z < -canvas.width / 2 ||
        star.y - star.z > canvas.height / 2 ||
        star.y + star.z < -canvas.height / 2
      ) {
        star.reset();
      }
    }

    if (this.stars.length < this.starsCount)
      this.stars.push(new Star(this.ctx, this.starsSpeed));
  }

  draw() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw();
    }
  }

  clear() {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(
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
  }
}
