import Star from "./Star";

const FORCE_COLORS = ["#00BBFF", "#FF0000", "#FFFF00", "#FFAAFF"];

export default class Starfield {
  fps = 60;
  interval;
  lastTime;
  currentTime = 0;
  ctx;
  starsCount = 3000;
  stars = [];
  contextTMP;
  canvasTMP;
  force = 1;
  _boundForcePush;
  _time = -5; // Start centered, drift begins after a few seconds

  constructor(ctx) {
    this.ctx = ctx;

    this.canvasTMP = document.createElement("canvas");
    this.contextTMP = this.canvasTMP.getContext("2d");

    this.canvasTMP.width = this.ctx.canvas.width;
    this.canvasTMP.height = this.ctx.canvas.height;

    this.lastTime = performance.now();
    this.interval = 1000 / this.fps;

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
    // Wider bounds to account for vanishing point drift
    const centerX = canvas.width * 1.5;
    const centerY = canvas.height * 1.5;
    const stars = this.stars;
    const force = this.force;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.update(force);

      if (
        star.x - star.z > centerX ||
        star.x + star.z < -centerX ||
        star.y - star.z > centerY ||
        star.y + star.z < -centerY
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

  draw() {
    const ctx = this.contextTMP;
    const stars = this.stars;
    const forceActive = this.force > 1;

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
        coloredStars.push(star);
        continue;
      }

      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.origX, star.origY);
    }
    ctx.stroke();

    if (coloredStars && coloredStars.length > 0) {
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

    this._time += 0.004;
    const t = this._time;

    if (delta > this.interval) {
      // Ease in: no drift at start, full drift after _time > 0
      const ease = t <= 0 ? 0 : Math.min(1, t * 0.2);
      const driftX = (Math.sin(t * 0.7) * 350 + Math.sin(t * 1.9) * 150 + Math.cos(t * 0.3) * 200) * ease;
      const driftY = (Math.cos(t * 0.5) * 250 + Math.sin(t * 1.3) * 100 + Math.sin(t * 0.2) * 150) * ease;

      const ctx = this.contextTMP;
      const hw = this.canvasTMP.width / 2;
      const hh = this.canvasTMP.height / 2;

      // Clear with identity transform (full canvas)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.canvasTMP.width, this.canvasTMP.height);

      // Set vanishing point with drift
      ctx.translate(hw + driftX, hh + driftY);

      this.update();
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
