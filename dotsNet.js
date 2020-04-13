import { Particle } from './particle.js';
import { Canvas } from './canvas.js';

export class dotsNet extends Canvas {
  constructor() {
    super();

    this.particles = [];
    this.init();
  }

  bindAll() {
    ['render', 'addEvents', 'init', 'drawLine']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  createParticles() {
    for (let i = 0; i < 800; i++) {
      this.particles.push(
        new Particle({
          position: {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
          },
          size: 3,
          speed: Math.random() * 2 - 1,
          direction: Math.random() * 360 / 180 * Math.PI
        })
      );
    }

  }

  drawLine(context, particleA, particleB, distance) {
    context.lineWidth = 1 - distance / 100
    context.beginPath();
    context.moveTo(particleA.position.x, particleA.position.y);
    context.lineTo(particleB.position.x, particleB.position.y);
    context.stroke();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.particles.forEach(particle => {
      particle.drawParticle(this.context);
      particle.update();
    });

    for (let i = 0; i < this.particles.length - 1; i++) {
      const particleA = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const particleB = this.particles[j];
        const distance = particleB.distanceTo(particleA);
        distance < 100 ? this.drawLine(this.context, particleA, particleB, distance) : '';
      }
      
    }
    

    requestAnimationFrame(this.render);
  }

  addEvents() {
    
  }

  init() {
    this.bindAll();
    this.addEvents();
    this.createParticles();
    this.render();
  }

}

const a = new dotsNet();