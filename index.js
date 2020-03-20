import { Particle } from './particle';

const particleOptions = {
  speed: 2,
  size: 5
}

const particle = new Particle(particleOptions);
particle.init();