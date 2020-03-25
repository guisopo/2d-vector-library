export function norm(value, min, max) {
  // Takes a value from a range and returns a value from 0 to 1
  return value - min / max - min;
}

export function lerp(norm, min, max) {
  // Takes a normalized value and returns the value within a range
  return (max - min) * norm + min;
}

export function map(value, sourceMin, sourceMax, destMin, destMax) {
  
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function distance(p0, p1) {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function degreesToRadians(degrees) {
  return degrees / 180 * Math.PI;
}

export function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}