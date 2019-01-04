import { Particle } from '../scripts/particle.js';
import { Canvas } from '../scripts/canvas.js';


export class ParticlesGrid extends Canvas {
  constructor(numberParticles, particlesRadius, particlesFriction, k, targetRadius) {
    super();
    
    this.numberParticles = numberParticles;
    this.marginH = this.width / this.numberParticles;
    this.marginV = this.height / this.numberParticles;
    this.particles = [];

    this.target = new Particle(0, 0, 0, 0);
    this.target.radius = targetRadius;
    
    this.createParticles(particlesRadius, particlesFriction, k);
    
    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);

    this.onMouseMove(this.target);
    this.onMouseDown(this.target);
    this.onMouseUp(this.target);
  }

  onMouseMove(target) {
    document.body.addEventListener('mousemove', function(event) {
      target.x = event.clientX;
      target.y = event.clientY;
    });
  }

  onMouseDown(target) {
    document.body.addEventListener('mousedown', function() {
      target.radius = target.radius * 3;
    });
  }

  onMouseUp(target) {
    document.body.addEventListener('mouseup', function() {
      target.radius = target.radius / 3;
    });
  }

  createParticles(radius, friction, k) {
    for (let i = 0; i < this.numberParticles; i++) {
      for (let j = 0; j < this.numberParticles; j++) {
        let p = new Particle (i * this.marginH + this.marginH/2, j * this.marginV + this.marginV/2, 0, 0);
        p.radius = radius;
        p.friction = friction;
        
        p.setSpringTarget(p.x, p.y, k);
        
        this.particles.push(p);  
      }
    }
  }

  update() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.particles.forEach(particle => {
      particle.think(this.target, this.target.radius);
      particle.update();
      particle.drawParticle(this.context);
    });

    requestAnimationFrame(this.updateBound);
  }

}