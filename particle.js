import { Vector } from './vector';
import { Canvas } from './canvas';

class Particle extends Canvas {
  constructor(options = {}) {
    super();

    this.options = {
      position: options.position || {x: 100, y:100},
      speed: options.speed || 1,
      direction: options.direction || 0,
      size: options.size || 10
    }
  
    this.position = new Vector(this.options.position.x, this.options.position.y);
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(this.options.speed);
    this.velocity.setAngle(this.options.direction);
  }

  bindAll() {
    ['render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  drawParticle() {
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, this.options.size, 0, Math.PI * 2, false);
    this.context.fill();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.position.addTo(this.velocity);
    this.drawParticle();

    requestAnimationFrame(this.render);
  }

  init() {
    this.bindAll();
    this.render();
  }
}

export { Particle };