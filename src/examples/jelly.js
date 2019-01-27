import { Particle } from '../scripts/particle.js';
import { Canvas } from '../scripts/canvas.js';

export class Jelly extends Canvas {
  constructor() {
    super();
    
    this.numberOfParticles = 65;
    this.particles = [];
    this.createParticles(this.numberOfParticles, this.particles);

    this.mouse = new Particle(Math.random() * this.width, Math.random() * this.height, 0, 0, 0);
    this.mouse.radius = 50;

    this.onMouseMove(this.mouse);
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  onMouseMove() {
		document.addEventListener('mousemove', (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }
  
  connectParticles(array) {
    this.context.beginPath();
    for (let i = 0, jlen = array.length; i <= jlen; ++i) {
      let p0 = array[i + 0 >= jlen ? i + 0 - jlen : i + 0];
      let p1 = array[i + 1 >= jlen ? i + 1 - jlen : i + 1];
      this.context.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
    }
    // this.context.stroke();
    this.context.closePath();
    this.context.fill();
    
  }
  
  createParticles(n, array) {
    for(let i = 0; i <= n; i++) {
      let particle = new Particle(  this.width/2 + 200 * Math.cos(i * Math.PI/n * 2), 
                                    this.height/2 + 200 * Math.sin(i * Math.PI/n * 2), 
                                    0, 
                                    0, 
                                    0);
      particle.friction = 0.4;
      array.push(particle);
    }
  }
  
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.connectParticles(this.particles);
    // this.mouse.drawParticle(this.context);
    this.context.globalCompositeOperation = 'xor';
    this.particles.forEach(p => {
      p.think(this.mouse, this.mouse.radius);
      p.springBack(0.1);
      p.drawParticle(this.context);
      p.update();
    });
    
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}