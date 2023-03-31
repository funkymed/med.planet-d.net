import SmokeParticle from "./SmokeParticle";

export default class Smoke {
  ctx;
  imageObj;
  particles = [];
  // The amount of particles to render
  particleCount = 15;
  // The maximum velocity in each direction
  maxVelocity = 1;
  constructor(ctx) {
    this.ctx = ctx;
    this.init();
  }

  // A function to generate a random number between 2 values
  generateRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  init() {
    // Create the particles and set their initial positions and velocities
    for (var i = 0; i < this.particleCount; ++i) {
      var particle = new SmokeParticle(this.ctx);

      // Set the position to be inside the canvas bounds
      particle.setPosition(
        this.generateRandom(0, this.ctx.canvas.width),
        this.generateRandom(0, this.ctx.canvas.height)
      );

      // Set the initial velocity to be either random and either negative or positive
      particle.setVelocity(
        this.generateRandom(-this.maxVelocity, this.maxVelocity),
        this.generateRandom(-this.maxVelocity, this.maxVelocity)
      );
      
      this.particles.push(particle);
    }
  }
  // The function to draw the scene
  draw(time) {
    this.particles.forEach(function (particle) {
      particle.draw(time);
    });
  }

  // Update the scene
  update() {
    this.particles.forEach(function (particle) {
      particle.update();
    });
  }
}
