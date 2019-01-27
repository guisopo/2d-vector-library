import { Canvas } from '../scripts/canvas.js';
import { Particle } from '../scripts/particle.js';
import * as utils from '../scripts/utils.js';

export class SpringParticles extends Canvas {
  constructor(numberOfParticles = 10, radius = 4, separation = 10) {
    super();
    
    this.numberOfParticles = numberOfParticles;
    this.radius = radius,
    this.separation = separation;
    
    this.particles = [];
    this.friction = 0.9,
    this.k = 0.01,

    this.createParticles(this.radius, this.friction);    
    this.onMouseClick();  
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  onMouseClick() {
    document.addEventListener('click', () => {
      this.createParticles(this.radius, this.friction);
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
      const particle = new Particle({
                              x:utils.randomRange(this.width * 0.4, this.width * 0.6), 
                              y: utils.randomRange(0, this.height), 
                              speed: utils.randomRange(0, 50),
                              direction: utils.randomRange(0, Math.PI * 2),
                              radius: radius
                            });
      particle.friction = friction;
      this.particles.push(particle);
      particle.index = this.particles.indexOf(particle);
    };
    if(this.numberOfParticles != 1) {
      this.numberOfParticles = 1;
    }
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