import { Canvas } from '../scripts/canvas.js';
import { Particle } from '../scripts/particle.js';
import * as utils from '../scripts/utils.js';

export class springParticles extends Canvas {
  constructor(numberOfParticles, radius, separation) {
    super();
    
    this.numberOfParticles = numberOfParticles;
    this.radius = radius,
    this.separation = separation;
    
    this.particles = [];
    this.friction = 0.9,
    this.k = 0.01,

    this.createParticles(this.radius, this.friction);    
    this.onMouseClick(this, this.createParticles, this.friction, this.radius);  
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  onMouseClick(that, callback, friction, radius) {
    document.addEventListener('click', function() {
      callback.call(that, radius, friction);
    });
  }

  checkEdges(particle) {
		if(particle.y + particle.radius > this.height) {
			particle.y = (this.height - particle.radius);
			particle.vy = (particle.vy * -0.95);
    }
	}

  createParticles(radius, friction) {
    for(let p = 0; p < this.numberOfParticles; p++) {
      const particle = new Particle(utils.randomRange(this.width * 0.4, this.width * 0.6), 
                              utils.randomRange(0, this.height), 
                              utils.randomRange(0, 50),
                              utils.randomRange(0, Math.PI * 2),
                              0
                            );
      particle.friction = friction;
      particle.radius = radius;
      this.particles.push(particle);
      particle.index = this.particles.indexOf(particle);
    };
    this.springTo(this.particles);
  }

  springTo(particles) {
    particles.forEach(particle => {
      particle.springs = [];
      for(let i = 0; i < particles.length; i++) {
        if( particle.index !== i){
          particle.addSpring(particles[i], 0.01, 250);
        }
      }
    });
  }
  
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.particles.forEach(particle => {
      particle.update();
      particle.drawParticle(this.context);
      if (particle.gravity !== 0) {
        this.checkEdges(particle);
      } 
    });
    
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}