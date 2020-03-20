import { Vector } from './vector';
import { Canvas } from './canvas';

class Particle extends Canvas {
  constructor() {
    super();

    this.vector = new Vector(100, 100);
  }

  bindAll() {
    ['render', 'draw', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);
    this.context.beginPath();
    this.context.arc(this.vector.x, this.vector.y, 10, 0, Math.PI * 2, false);
  }

  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  init() {
    this.bindAll();
    this.render();
  }
}

const particle = new Particle();
particle.init();