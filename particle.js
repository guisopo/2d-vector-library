import { Vector } from './vector';

class Particle {
  constructor(options = {}) {

    this.position = options.position || {x: 0, y: 0};
    this.particleColor = options.particleColor || '#000000';
    this.size = options.size || 10;
    this.mass = options.mass || 1;
    this.direction = options.direction || 0;
    this.speed = options.speed || 0;
    this.gravity = options.gravity || 0;
    this.friction = options.friction || 1;
    this.bounce = options.bounce || -1;
  
    this.vx = Math.cos(this.direcion) * this.speed;
    this.vy = Math.cos(this.direcion) * this.speed;
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

  accelerate(ax, ay) {
    this.vx += (ax);
    this.vy += (ay);
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
    const dx = this.position.x - p2.position.x;
    const dy = this.position.y - p2.position.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const force = p2.mass / (distance * distance);
    
    const ax = (dx / distance) * force;
    const ay = (dy / distance) * force;

    this.vx += ax;
    this.vy += ay;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;

    this.position.x += this.vx;
    this.position.y += this.vy;
  }

  init() {
    this.bindAll();
    this.addEventListeners();
  }
}

export { Particle };