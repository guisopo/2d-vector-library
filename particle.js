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

  create: function(x, y, speed, direction, grav) {
    var obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    obj.gravity = grav || 0;
    return obj;
  },

  getSpeed: function() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  },

  setSpeed: function(speed) {
    var direction = this.getDirection();
    this.vx = cos(direction) * speed;
    this.vy = sin(direction) * speed;
  },

  getAngle: function() {
    return Math.atan2(this.vy, this.vx);
  },

  setAngle: function(direction) {
    var angle = this.getAngle();
    this.vx = cos(angle) * direction;
    this.vy = sin(angle) * direction;
  },

  accelerate: function(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  },

  update: function() {
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
  },

  angleTo:  function(p2) {
    return Math.atan2(p2.y() - this.y(), p2.x() - this.x());
  },

  distanceTo: function(p2) {
    var dx = p2.x() - this.x();
    var dy = p2.y() - this.y();
    return Math.sqrt(dx * dx + dy * dy);
  },

  gravitateTo: function(p2) {
    var dist = this.distanceTo(p2)
        force = p2.mass / dist * dist,
    //  angle = this.angleTo(p2);
    //  ax = Math.cos(angle) * force;
    //  ay = Math.sin(angle) * force;
    //  Same as:
        ax = dx / dist * force;
        ay = dy / dist * force;

    this.vx += ax;
    this.vy += ay;
  }

}