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

  // Batched draw: 1 path for all white stars, then colored groups
  draw() {
    const ctx = this.contextTMP;
    const stars = this.stars;
    const forceActive = this.force > 1;

    // Draw all stars as simple lines in a single batched approach
    // Group by line width ranges to minimize state changes
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.beginPath();

    let coloredStars = null;
    if (forceActive) {
      coloredStars = [];
    }

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (forceActive && star.z > 0.005) {
        // Collect stars that need color for a second pass
        coloredStars.push(star);
        continue;
      }

      // White star - add to batch path
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.origX, star.origY);
    }
    ctx.stroke();

    // Second pass: colored stars during force (much fewer)
    if (coloredStars && coloredStars.length > 0) {
      // Group by random color - just use 1 color for all for speed
      ctx.strokeStyle = FORCE_COLORS[(Math.random() * 4) | 0];
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < coloredStars.length; i++) {
        const star = coloredStars[i];
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
