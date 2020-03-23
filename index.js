import { Particle } from './particle';
import { Vector } from './vector';

const shipOptions = {
  thrust: {x: 0, y: 0},
  size: 5
}

const ship = new Particle(shipOptions);
ship.init();