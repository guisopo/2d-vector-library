// Angle unit conversion
const degreesToRad = function(degrees) {
  return degrees / 180 * Math.PI;
}
const radToDegrees = function(radians) {
  return radians * 180 / Math.PI;
}
// Round value
const roundToPlaces = function(value, places) {
  const mult = Math.pow(10, places);
  return Math.round(value * mult) / mult;
}
const roundNearest = function(value, nearest) {
  return Math.round(value / nearest) * nearest;
}
// Normalization
// Takes a value within a range (min to max) a returns an equivalent value within a range from 0 to 1.
const norm = function(value, min, max) {
  return  (value - min) / (max - min);
}
// Lintear Interpolation
// Takes a normalized value and returns the equivalent within the specified range (min to max)
const lerp = function(value, min, max) {
  return  (max - min) * value + min;
}
// Map
// Takes a value from one range (sourceMin to sourceMax) and returns the equivalent from another range (destMin to destMax)
const map = function(value, sourceMin, sourceMax, destMin, destMax) {
  return  utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
}
// Clamp
// Limits a value to ensure it stays within a range
const clamp = function(value, min, max) {
  return  Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}
// Random Range
// Returns a random value within a range
const randomRange = function(min, max) {
  return  min + Math.random() * (max - min);
}
// Random Integer
// Returns a random integer value within a range
const randomInt = function(min, max) {
  return  Math.floor(min + Math.random() * (max - min + 1));
}
//Random Distribution
// Returns a weighted random number based on the number of iterations
const randomDist = function(min, max, iterations) {
  let total = 0;
  for(let i = 0; i < iterations; i++) {
    total += utils.randomRange(min, max);
  }
  return total / iterations;
}
// Distance 
// Returns the distance between two points
const distance = function(p0, p1) {
  const dx = p1.x - p0.x,
        dy = p1.y - p0.y;
  return  Math.sqrt(dx * dx + dy * dy);
}
// Distance RAW
// Returns the distance between two points with raw x and y values
const distanceXY = function(x0, y0, x1, y1) {
  const dx = x1 - x0,
        dy = y1 - y0;
  return  Math.sqrt(dx * dx + dy * dy);
}
// Collision between two cirlces
// Returns a boolean
const circleCollision = function(c0, c1) {
  return  utils.distance(c0, c1) <= c0.radius + c1.radius;
}
// Collision between a cirlce and a point
// Returns a boolean
const circlePointCollision = function(x, y, circle) {
  return  utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
}
// Point in a line
// Returns a boolean
const pointInRect = function(x, y, rect) {
  return  utils.inRange(x, rect.x, rect.x + rect.width) &&
          utils.inRange(y, rect.y, rect.y + rect.height);
}
// Checks if a value is in a specified range (min to max)
// Returns a boolean
const inRange = function(value, min, max) {
  return  value >= Math.min(min, max) && value <= Math.max(min, max);
}
// Checks if there is an intersection between two ranges
const rangeIntersect = function(min0, max0, min1, max1) {
  return  Math.max(min0, max0) >= Math.min(min1, max1) && 
          Math.min(min0, max0) <= Math.max(min1, max1);
}
// Checks if two straight lines intersect
const rectIntersect = function(r0, r1) {
  return  utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
          utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
}

const quadraticBezier = function(p0, p1, p2, t, pFinal) {
  pFinal = pFinal || {};
  pFinal.x = Math.pow(1 - t, 2) * p0.x +
            (1 - t) * 2 * t * p1.x +
            t * t * p2.x;
  pFinal.y = Math.pow(1 - t, 2) * p0.y +
            (1 - t) * 2 * t * p1.y +
            t * t * p2.y;
  return  pFinal;
}

const cubicBezier = function(p0, p1, p2, p3, t, pFinal) {
  pFinal =  pFinal || {};
  pFinal.x =  Math.pow(1 - t, 3) * p0.x +
              Math.pow(1 - t, 2) * 3 * t * p1.x +
              (1 - t) * 3 * t * t * p2.x +
              t * t * t * p3.x;
  pFinal.y =  Math.pow(1 - t, 3) * p0.y +
              Math.pow(1 - t, 2) * 3 * t * p1.y +
              (1 - t) * 3 * t * t * p2.y +
              t * t * t * p3.y;
  return  pFinal;
}

const multiCurve = function(points, context) {
  let p0, p1, midX, midY;

  context.moveTo(points[0].x, points[0].y);
  
  for(let i = 1; i < points.length -2; i+=1) {
    p0 = points[i];
    p1 = points[i + 1];
    midX =(p0.x + p1.x) / 2;
    midY =(p0.y + p1.y) / 2;
    context.quadraticCurveTo(p0x, p0.y, midX, midY);
  }

  p0 = points[points.lenght - 2];
  p1 = points[points.lenght - 1];
  context.context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
}