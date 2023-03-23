export default class Star {
  x = 0;
  y = 0;
  z = 0;
  canvas;
  context;
  starsSpeed = 0;
  phase = 0;
  constructor(context, starsSpeed) {
    this.canvas = context.canvas;
    this.context = context;
    this.starsSpeed = starsSpeed;
    this.reset();
  }

  reset() {
    const sourceX = this.canvas.width / 2;
    const sourceY = this.canvas.height / 2;
    this.x = this.random(-sourceX, sourceX);
    this.y = this.random(-sourceY, sourceY);
    this.z = 0;
    this.origX = this.x;
    this.origY = this.y;
  }

  random(min, max) {
    return min + Math.random() * (max - min);
  }

  update() {
    // const sourceX = this.canvas.width / 2;
    // const sourceY = this.canvas.height / 2;
    this.origX = this.x;
    this.origY = this.y;
    this.z += this.starsSpeed;
    this.x += this.x * this.z * this.starsSpeed;
    this.y += this.y * this.z * this.starsSpeed;
  }

  draw() {
    this.context.fillStyle = "#FFFFFF";
    this.context.strokeStyle = "#FFFFFF";
    this.context.lineWidth = 2;
    this.context.lineWidth = this.z;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.origX, this.origY);
    this.context.stroke();
  }
}
