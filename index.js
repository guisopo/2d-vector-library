import { Vector } from './vector';
import { Canvas } from './canvas';

class Particle extends Canvas {
  constructor() {
    super();

    this.particle = new Vector(100, 100);

    this.velocity = new Vector(0, 0);
    this.velocity.setLength(3);
    this.velocity.setAngle(Math.PI / 6);
  }

  bindAll() {
    ['render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  drawParticle() {
    this.context.beginPath();
    this.context.arc(this.particle.x, this.particle.y, 10, 0, Math.PI * 2, false);
    this.context.fill();
  }

  render() {
    this.context.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);
    this.particle.addTo(this.velocity);
    this.drawParticle();
    requestAnimationFrame(this.render);
  }

  init() {
    this.bindAll();
    this.render();
  }
}

const particle = new Particle();
particle.init();