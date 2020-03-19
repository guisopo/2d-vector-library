import { Vector } from './vector';

let v1 = new Vector(10, 5);
let v2 = v1.multiply(2);
console.log(v1);
v1.addTo(v2)
console.log(v2);
console.log(v1);