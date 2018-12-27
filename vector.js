class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  setX(value) {
    this._x = value;
  }

  getX() {
    return this._x;
  }

  setY(value) {
    this._y = value;
  }

  getY() {
    return this._y;
  }

  setAngle(angle) {
    let length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    let angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY());
  }

  subtract(v2) {
    return vector.create(this._x - v2.getX(), this._y - v2.getY());
  }

  multiply(value) {
    return vector.create(this._x * value, this._y * value);
  }

  divide(value) {
    return vector.create(this._x / value, this._y / value);
  }

  addTo(v2) {
    this._x += v2.getX();
    this._y += v2.getY();
  }

  subtractFrom(v2) {
    this._x -= v2.getX();
    this._y -= v2.getY();
  }

  multiplyBy(value) {
    this._x *= value;
    this._y *= value;
  }

  divideBy(value) {
    this._x /= value;
    this._y /= value;
  }

}