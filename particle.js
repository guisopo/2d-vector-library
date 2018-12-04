var particle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  mass: 1,
  radius: 0,
  bounce: -1,
  friction: 1,
  gravity: 0,
  springs: null,

  create: function(x, y, speed, direction, grav) {
    var obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    obj.gravity = grav || 0;
    obj.springs= [];
    obj.gravitations = [];
    return obj;
  },

  addGravitation: function(p) {
    this.removeGravitation(p);
    this.gravitations.push(p);
  },

  removeGravitation: function(p) {
    this.gravitations.forEach(gravitation => {
      if(p === gravitation.p) {
        this.gravitations.splice(this.gravitations.indexOf(p), 1);
        return;
      }
    });
  },

  handleGravitations: function() {
    this.gravitations.forEach(gravitation => {
      this.gravitateTo(gravitation);
    });
  },

  addSpring: function(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length || 0,
    })
  },

  removeSpring: function(point) {
    this.springs.forEach(spring => {
      if(point === spring.point) {
        this.springs.splice(this.springs.indexOf(point), 1);
        return;
      }
    });
  },

  handleSprings: function() {
    this.springs.forEach(spring => {
      this.springTo(spring.point, spring.k, spring.length);
    });
  },

  getSpeed: function() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  },

  setSpeed: function(speed) {
    var direction = this.getDirection();
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
  },

  getDirection: function() {
    return Math.atan2(this.vy, this.vx);
  },

  setDirection: function(direction) {
    var speed = this.getSpeed();
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
  },

  accelerate: function(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  },

  update: function() {
    this.handleSprings();
    this.handleGravitations();

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
  },

  angleTo:  function(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  },  

  distanceTo: function(p2) {
    var dx = p2.x - this.x,
        dy = p2.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  gravitateTo: function(p2) {
    var dx = p2.x - this.x,
        dy = p2.y - this.y,
        dist = this.distanceTo(p2)
        force = p2.mass / dist * dist,
    //  angle = this.angleTo(p2);
    //  ax = Math.cos(angle) * force;
    //  ay = Math.sin(angle) * force;
    //  Same as:
        ax = dx / dist * force;
        ay = dy / dist * force;

    this.vx += ax;
    this.vy += ay;
  },

  springTo: function(springPoint, k, springLength) {
    var dx = springPoint.x - this.x,
        dy = springPoint.y - this.y,
        distance = Math.sqrt( dx * dx + dy * dy),
        springForce = (distance - springLength || 0) * k;
    this.vx += dx / distance * springForce,
    this.vy += dy / distance * springForce;
  }

}