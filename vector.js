var vector = {
  _x: 1,
  _y: 0,

  create: function(x, y) {
    var obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },

  setX: function(value) {
    this._x = value;
  },

  getX: function() {
    return this._x;
  },

  setY: function(value) {
    this._y = value;
  },

  getY: function() {
    return this._y;
  },

  setAngle: function(angle) {
    var length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getAngle: function() {
    return Math.atan2(this._y, this._x);
  },

  setLength: function(length) {
    var angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getLength: function() {
    return Math.sqrt( this._x * this._x + this._y * this._y);
  }

}