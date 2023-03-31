export default class Star {
  x = 0;
  y = 0;
  z = 0;
  canvas;
  context;
  starsMinSpeed = 0.0001;
  starsMaxSpeed = 0.01;
  starsSpeed = 0.01;
  force;
  constructor(context, starsSpeed) {
    this.canvas = context.canvas;
    this.context = context;
    this.starsSpeed = this.getRandomArbitrary(
      this.starsMinSpeed,
      this.starsMaxSpeed
    );
    this.reset();
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  reset() {
    const sourceX = this.canvas.width / 2;
    const sourceY = this.canvas.height / 2;
    this.x = this.random(-sourceX, sourceX);
    this.y = this.random(-sourceY, sourceY);
    this.z = 0;
    this.origX = this.x;
    this.origY = this.y;
    this.starsSpeed = this.getRandomArbitrary(
      this.starsMinSpeed,
      this.starsMaxSpeed
    );
  }

  random(min, max) {
    return min + Math.random() * (max - min);
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

  draw() {
    let colorFill = "#FFFFFF";
    if (this.force > 1) {
      switch (Math.floor(Math.random() * 3)) {
        case 1:
          colorFill = "#FF0000";
          break;
        case 2:
          colorFill = "#FFFF00";
          break;
        case 3:
          colorFill = "#FFAAFF";
          break;
        default:
          colorFill = "#00BBFF";
          break;
      }
    }

    this.context.fillStyle = colorFill;
    this.context.strokeStyle = colorFill;

    this.context.lineWidth = 1;
    this.context.lineWidth = this.z;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.origX, this.origY);
    this.context.stroke();
  }
}
