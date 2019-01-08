import { Canvas } from './canvas.js';
import { Particle } from './particle.js';
import * as utils from './utils.js';

class springParticles extends Canvas {
  constructor() {
    super();

    this.numberOfParticles = 3;
    this.particles = [];
    this.radius = 5,
    this.friction = 0.9,
    this.k = 0.01,
    this.separation = 250;

    this.createParticles(this.radius, this.friction);

    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);

    this.onMouseClick(this.particles);
  }

  onMouseClick(particles) {
    document.addEventListener('click', function(event) {
      let newParticle = new Particle(event.x, 
                                event.y, 
                                utils.randomRange(0, 50),
                                utils.randomRange(0, Math.PI * 2),
                                0
                            );
      newParticle.friction = this.friction;
      newParticle.radius = this.radius;

      particles.push(newParticle);
      newParticle.index = particles.indexOf(newParticle);
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
    console.log(this.particles);
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    
    this.particles.forEach(particle => {
      for(let i = 0; i < this.particles.length; i++) {
        if( particle.index !== i){
          particle.springTo(this.particles[i],this.k, this.separation);
        }
        // particle.springTo(cursor, k, 10);
      }
    });

    this.particles.forEach(particle => {
     
      particle.update();
      particle.drawParticle(this.context);

      // cursor
      // context.beginPath();
      // context.arc(cursor.x, cursor.y, cursor.radius, 0, Math.PI * 2, false);
      // context.fill();

      this.checkEdges(particle);
      
    });

  }

  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}
new springParticles();