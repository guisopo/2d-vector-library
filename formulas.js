function norm(value, min, max) {
  // Takes a value from a range and returns a value from 0 to 1
  return value - min / max - min;
}