class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  setAngle(angle) {
    const length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    const angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(v2) {
    return new Vector(this._x + v2.x, this._y + v2.y);
  }

  substract(v2) {
    return new Vector(this._x - v2.x, this._y - v2.y);
  }

  multiply(value) {
    return new Vector(this._x * value, this._y * value);
  }

  divide(value) {
    return new Vector(this._x / value, this._y / value);
  }

  addTo(v2) {
    this._x += v2.x;
    this._y += v2.y;
  }

  substractFrom(v2) {
    this._x -= v2.x;
    this._y -= v2.y;
  }

  multiplyBy(value) {
    this._x *= value;
    this._y *= value;
  }

  dividedBy(value) {
    this._x /= value;
    this._y /= value;
  }
}

export { Vector };