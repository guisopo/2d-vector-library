import { Vector } from './vector';

class Particle {
  constructor(options = {}) {

    this.position = options.position || {x: 120, y: 100};
    this.speed = options.speed || 0;
    this.gravity = options.gravity || 0;
    this.thrust = options.thrust || {x: 0, y: 0};
    this.friction = options.friction || 1;
    this.direction = options.direction || 0;
    this.size = options.size || 10;
    this.mass = options.mass || 1;
    this.particleColor = options.particleColor || '#000000';
  
    this.position = new Vector(this.position.x, this.position.y);
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(this.speed);
    this.velocity.setAngle(this.direction);
    this.gravity = new Vector(0, this.gravity);
    this.thrust = new Vector(this.thrust.x, this.thrust.y);
  }

  bindAll() {
    [ 'addEventListeners', 'render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  drawParticle(context) {
    context.fillStyle= this.particleColor;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
    context.fill();
  }

  accelerate(acc) {
    this.velocity.addTo(acc);
  }

  angleTo(p2) {
    return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
  }

  distanceTo(p2) {
    const dx = p2.position.x - this.position.x; 
    const dy = p2.position.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  gravitateTo(p2) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(p2);

    gravity.setLength(p2.mass / (distance * distance));
    gravity.setAngle(this.angleTo(p2));
    
    this.velocity.addTo(gravity);
  }

  update() {
    this.velocity.multiplyBy(this.friction);
    this.position.addTo(this.velocity);
  }

  init() {
    this.bindAll();
    this.addEventListeners();
  }
}

export { Particle };