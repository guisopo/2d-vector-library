import { Particle } from './particle';
import { Vector } from './vector';

const sunOptions = {
  mass: 20000,
  positon: { x: width/2, y:height/2 }
}

const planetOptions = {
  position: { x: width/2 + 200, y: height/2 },
  speed: 10,
  direction: -Math.PI/2
}

const sun = new Particle(sunOptions);
const planet = new Particle(planetOptions);