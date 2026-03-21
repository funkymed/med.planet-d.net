import Star from "./Star";

const FORCE_COLORS = ["#00BBFF", "#FF0000", "#FFFF00", "#FFAAFF"];

export default class Starfield {
  fps = 60;
  interval;
  lastTime;
  currentTime = 0;
  ctx;
  starsCount = 1500;
  stars = [];
  contextTMP;
  canvasTMP;
  force = 1;
  _boundForcePush;

  constructor(ctx) {
    this.ctx = ctx;

    this.canvasTMP = document.createElement("canvas");
    this.contextTMP = this.canvasTMP.getContext("2d");

    this.canvasTMP.width = this.ctx.canvas.width;
    this.canvasTMP.height = this.ctx.canvas.height;

    this.lastTime = performance.now();
    this.interval = 1000 / this.fps;

    this.contextTMP.translate(
      this.canvasTMP.width / 2,
      this.canvasTMP.height / 2
    );

    // Pre-allocate all stars
    for (let i = 0; i < this.starsCount; i++) {
      this.stars.push(new Star(this.contextTMP));
    }

    this._boundForcePush = this.forcePush.bind(this);
    document.addEventListener("keyup", this._boundForcePush);
  }

  destroy() {
    document.removeEventListener("keyup", this._boundForcePush);
  }

  forcePush(e) {
    if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
      this.force = 10;
    }
  }

  update() {
    const canvas = this.canvasTMP;
    const centerX = canvas.width;
    const centerY = canvas.height;
    const stars = this.stars;
    const force = this.force;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.update(force);

      if (
        star.x - star.z > centerX ||
        star.x + star.z < -centerX ||
        star.y - star.z > centerY / 2 ||
        star.y + star.z < -centerY / 2
      ) {
        star.reset();
      }
    }

    if (force > 1) {
      this.force -= 0.1;
    } else if (force < 1) {
      this.force = 1;
    }
  }

  // Pre-allocated array for colored stars indices
  _coloredIndices = new Uint16Array(1500);
  _coloredCount = 0;

  draw() {
    const ctx = this.contextTMP;
    const stars = this.stars;
    const forceActive = this.force > 1;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.beginPath();

    this._coloredCount = 0;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (forceActive && star.z > 0.005) {
        this._coloredIndices[this._coloredCount++] = i;
        continue;
      }

      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.origX, star.origY);
    }
    ctx.stroke();

    if (this._coloredCount > 0) {
      ctx.strokeStyle = FORCE_COLORS[(Math.random() * 4) | 0];
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < this._coloredCount; i++) {
        const star = stars[this._coloredIndices[i]];
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.origX, star.origY);
      }
      ctx.stroke();
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

  animate(timestamp) {
    this.currentTime = timestamp || performance.now();
    const delta = this.currentTime - this.lastTime;

    if (delta > this.interval) {
      this.update();
      this.clear();
      this.draw();
      this.lastTime = this.currentTime - (delta % this.interval);
    }

    this.ctx.drawImage(
      this.canvasTMP,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }
}
