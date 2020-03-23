import { Vector } from './vector';
import { Canvas } from './canvas';

class Particle extends Canvas {
  constructor(options = {}) {
    super();

    this.options = {
      position: options.position || {x: 120, y: 100},
      speed: options.speed || 0,
      gravity: options.gravity || 0,
      thrust: options.thrust || {x: 0, y: 0},
      direction: options.direction || 0,
      size: options.size || 10
    }
  
    this.position = new Vector(this.options.position.x, this.options.position.y);
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(this.options.speed);
    this.velocity.setAngle(this.options.direction);
    this.gravity = new Vector(0, this.options.gravity);
    this.thrust = new Vector(this.options.thrust.x, this.options.thrust.y);
  }

  bindAll() {
    [ 'addEventListeners', 'render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  drawParticle() {
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, this.options.size, 0, Math.PI * 2, false);
    this.context.fill();
  }

  accelerate(acc) {
    this.velocity.addTo(acc);
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.accelerate(this.thrust);
    this.position.addTo(this.velocity);
    this.drawParticle();

    requestAnimationFrame(this.render);
  }

  addEventListeners() {
    document.body.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 38:
          this.thrust.y = -0.01;
          break;
        case 40:
          this.thrust.y = .01;
          break;
        case 37:
          this.thrust.x = -.01;
          break;
        case 39:
          this.thrust.x = .01;
          break;
      
        default:
          break;
      }
    });
    document.body.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case 38:
          this.thrust.y = 0;
          break;
        case 40:
          this.thrust.y = 0;
          break;
        case 37:
          this.thrust.x = 0;
          break;
        case 39:
          this.thrust.x = 0;
          break;
      
        default:
          break;
      }
    });
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.render();
  }
}

export { Particle };