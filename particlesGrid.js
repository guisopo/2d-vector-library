import { Particle } from './particle.js';
import { Canvas } from './canvas.js';

export class ParticlesGrid extends Canvas {
  constructor() {
    super();

    this.particlesRadius = 3;
    this.particlesFriction = 0.9;
    this.k = 0.02;
    
    this.numberParticles = 20;
    this.marginH = this.canvas.width / this.numberParticles;
    this.marginV = this.canvas.height / this.numberParticles;
    this.particles = [];

    this.target = new Particle();
    this.target.radius = 100;
    
    this.init();
  }

  bindAll() {
    ['render', 'addEvents', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  createParticles(radius, friction, k) {
    for (let i = 0; i < this.numberParticles; i++) {
      for (let j = 0; j < this.numberParticles; j++) {
        let p = new Particle ({
                                position: { x: i * this.marginH + this.marginH/2, y: j * this.marginV + this.marginV/2 }, 
                                size: radius,
                                friction: friction
                            });
        p.setSpringTarget(p.position.x, p.position.y, k);
        this.particles.push(p);  
      }
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.particles.forEach(particle => {
      particle.think(this.target, this.target.radius);
      particle.update();
      particle.drawParticle(this.context);
    });
    this.target.update();
    this.target.drawParticle(this.context);

    requestAnimationFrame(this.render);
  }

  addEvents() {
    document.body.addEventListener('mousemove', (e) => {
      this.target.position.x = e.clientX;
      this.target.position.y = e.clientY;
    });

    document.body.addEventListener('mousedown', () => this.target.radius = this.target.radius * 3 );

    document.body.addEventListener('mouseup', () => this.target.radius = this.target.radius / 3 );
  }

  init() {
    this.bindAll();
    this.addEvents();
    this.createParticles(this.particlesRadius, this.particlesFriction, this.k);
    this.render();
  }

}

const a = new ParticlesGrid();