class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.mass = 1;
    this.radius = 0;
    this.bounce = 1;
    this.friction = 1;
    this.gravity = 0;
    this.springs = null;
    this.gravitations = null
  }

  create(x, y, speed, direction, grav) {
    var obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    obj.gravity = grav || 0;
    obj.springs = [];
    obj.gravitations = [];
    return obj;
  }

  addGravitation(p) {
    this.removeGravitation(p);
    this.gravitations.push(p);
  }

  removeGravitation(p) {
    this.gravitations.forEach(gravitation => {
      if(p === gravitation.p) {
        this.gravitations.splice(this.gravitations.indexOf(p), 1);
        return;
      }
    });
  }

  handleGravitations() {
    this.gravitations.forEach(gravitation => {
      this.gravitateTo(gravitation);
    });
  }

  addSpring(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length || 0,
    })
  }

  removeSpring(point) {
    this.springs.forEach(spring => {
      if(point === spring.point) {
        this.springs.splice(this.springs.indexOf(point), 1);
        return;
      }
    });
  }

  handleSprings() {
    this.springs.forEach(spring => {
      this.springTo(spring.point, spring.k, spring.length);
    });
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    var direction = this.getDirection();
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
  }

  getDirection() {
    return Math.atan2(this.vy, this.vx);
  }

  setDirection(direction) {
    var speed = this.getSpeed();
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  update() {
    this.handleSprings();
    this.handleGravitations();

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  distanceTo(p2) {
    var dx = p2.x - this.x,
        dy = p2.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  gravitateTo(p2) {    
    var dx = p2.x - this.x,
        dy = p2.y - this.y,
        dist = this.distanceTo(p2),
        force = p2.mass / (dist * dist),
        ax = dx / dist * force,
        ay = dy / dist * force;
    //  Same as:
    //  angle = this.angleTo(p2);
    //  ax = Math.cos(angle) * force;
    //  ay = Math.sin(angle) * force;

    this.vx += ax;
    this.vy += ay;
  }

  springTo(springPoint, k, springLength) {
    var dx = springPoint.x - this.x,
        dy = springPoint.y - this.y,
        distance = Math.sqrt( dx * dx + dy * dy),
        springForce = (distance - springLength || 0) * k;
    this.vx += dx / distance * springForce,
    this.vy += dy / distance * springForce;
  }

}