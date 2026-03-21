export default class Star {
  x = 0;
  y = 0;
  z = 0;
  origX = 0;
  origY = 0;
  canvas;
  starsMinSpeed = 0.0001;
  starsMaxSpeed = 0.01;
  starsSpeed = 0.01;
  force = 1;
  color = "#FFFFFF";

  constructor(context) {
    this.canvas = context.canvas;
    this.starsSpeed = Math.random() * (this.starsMaxSpeed - this.starsMinSpeed) + this.starsMinSpeed;
    this.reset();
  }

  reset() {
    const hw = this.canvas.width / 2;
    const hh = this.canvas.height / 2;
    this.x = -hw + Math.random() * hw * 2;
    this.y = -hh + Math.random() * hh * 2;
    this.z = 0;
    this.origX = this.x;
    this.origY = this.y;
    this.starsSpeed = Math.random() * (this.starsMaxSpeed - this.starsMinSpeed) + this.starsMinSpeed;
    this.color = "#FFFFFF";
  }

  update(force) {
    this.force = force;
    this.starsSpeed *= force;
    this.origX = this.x;
    this.origY = this.y;
    this.z += this.starsSpeed;
    this.x += this.x * this.z * this.starsSpeed;
    this.y += this.y * this.z * this.starsSpeed;
  }
}
