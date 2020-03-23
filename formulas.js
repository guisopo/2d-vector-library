function norm(value, min, max) {
  // Takes a value from a range and returns a value from 0 to 1
  return value - min / max - min;
}

function lerp(norm, min, max) {
  // Takes a normalized value and returns the value within a range
  return (max - min) * norm + min;
}