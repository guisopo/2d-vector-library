import { Particle } from '../scripts/particle.js';
import { Canvas } from '../scripts/canvas.js';


export class ParticlesGrid extends Canvas {
  constructor(options = {}) {
    super();

    const {
      numberParticles = 20, 
      particlesRadius = 3, 
      particlesFriction = 0.9, 
      k = 0.02, 
      targetRadius = 100
    } = options;

    this.dx = 0;
    this.dy = 0;
    
    this.numberParticles = numberParticles;
    this.marginH = this.width / this.numberParticles;
    this.marginV = this.height / this.numberParticles;
    this.particles = [];

    this.target = new Particle();
    this.target.radius = targetRadius;
    
    this.createParticles(particlesRadius, particlesFriction, k);
    
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);

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
        let p = new Particle ({
                                x: i * this.marginH + this.marginH/2, 
                                y: j * this.marginV + this.marginV/2, 
                                speed : 0, 
                                direction: 0,
                                radius: radius
                            });
        p.friction = friction;
        p.i = i + j;
        p.setSpringTarget(p.x, p.y, k);
        
        this.particles.push(p);  
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
  
    this.particles.forEach(particle => {
      particle.i += 0.05;
      particle.think(this.target, this.target.radius);
      particle.update();
      particle.drawParticle(this.context);
    });
  }

  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }

}