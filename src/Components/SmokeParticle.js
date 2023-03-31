export default class SmokeParticle {
  // A function to create a particle object.
  context;
  x;
  y;
  xVelocity;
  yVelocity;
  imageObj;
  opacity = .035;
  constructor(context) {
    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    this.imageObj = new Image();
    this.imageObj.onload = this.loadImage.bind(this);
    this.imageObj.src = `./images/smoke${this.generateRandom(0, 4)}.png`;
  }

  loadImage() {
    this.setImage(this.imageObj);
  }

  generateRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  // The function to draw the particle on the canvas.
  draw = function (time) {
    // If an image is set draw it
    if (this.image) {
      const globalAlpha = this.context.globalAlpha;
      this.context.globalAlpha = this.opacity;
      this.context.drawImage(
        this.image,
        this.x - this.image.width / 2,
        this.y - this.image.height / 2
      );
      this.context.globalAlpha = globalAlpha;
      // If the image is being rendered do not draw the circle so break out of the draw function
      return;
    }
    // Draw the circle as before, with the addition of using the position and the radius from this object.
    // this.context.beginPath();
    // this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    // this.context.fillStyle = "rgba(0, 255, 255, 1)";
    // this.context.fill();
    // this.context.closePath();
  };

  // Update the particle.
  update = function () {
    // Update the position of the particle with the addition of the velocity.
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // Check if has crossed the right edge
    if (this.x >= this.context.canvas.width) {
      this.xVelocity = -this.xVelocity;
      this.x = this.context.canvas.width;
    }
    // Check if has crossed the left edge
    else if (this.x <= 0) {
      this.xVelocity = -this.xVelocity;
      this.x = 0;
    }

    // Check if has crossed the bottom edge
    if (this.y >= this.context.canvas.height) {
      this.yVelocity = -this.yVelocity;
      this.y = this.context.canvas.height;
    }

    // Check if has crossed the top edge
    else if (this.y <= 0) {
      this.yVelocity = -this.yVelocity;
      this.y = 0;
    }
  };

  // A function to set the position of the particle.
  setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };

  // Function to set the velocity.
  setVelocity = function (x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
  };

  setImage = function (image) {
    this.image = image;
  };
}
