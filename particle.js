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

    this.springs = [];
    this.gravitations = [];

    this.vx = Math.cos(this.direction) * this.speed;
    this.vy = Math.sin(this.direction) * this.speed;
  }

  bindAll() {
    [ 'addEventListeners', 'render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  drawParticle(context) {
    context.fillStyle = this.particleColor;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
    context.fill();
  }

  addGravitation(p) {
    this.removeGravitation(p);
    this.gravitation.push(p);
  }

  removeGravitation() {
    if(this.gravitations.length > 0) {
      for(let i = 0; i < this.gravitations.length; i++) {
        if(point === this.gravitations[i].point) {
          this.gravitations.splice(i, 1);
          return;
        }
      }
    }
  }

  addSpring(point, k, length = 0) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length
    });
  }

  removeSpring(point) {
    if(this.springs.length > 0) {
      for(let i = 0; i < this.springs.length; i++) {
        if(point === this.springs[i].point) {
          this.springs.splice(i, 1);
          return;
        }
      }
    }
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    const heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(heading) { 
    const speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
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
    const dx = p2.position.x - this.position.x;
    const dy = p2.position.y - this.position.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = p2.mass / (distance * distance);

    const ax = dx / distance * force;
    const ay = dy / distance * force;

    this.vx += ax;
    this.vy += ay;
  }

  springTo(p2, k, length = 0) {
    const dx = p2.position.x - this.position.x;
    const dy = p2.position.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const springForce = (distance - length) * k;
    this.vx += dx / distance * springForce;
    this.vy += dy / distance * springForce;
  }

  handleGravitations() {
    for(let i = 0; i < this.gravitations.length; i++) {
      this.gravitateTo(this.gravitations[i]);
    }
  }

  handleSprings() {
    for(let i = 0; i < this.springs.length; i++) {
      this.springTo(this.springs[i].point, this.springs[i].k, this.springs[i].length);
    }
  }

  update() {
    this.handleSprings();
    this.handleGravitations();

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