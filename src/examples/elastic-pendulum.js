import { Canvas } from '../scripts/canvas.js';
import { Particle } from '../scripts/particle.js';

export class ElasticPendulum extends Canvas {
  constructor() {
    super();

    this.springPoint = new Particle(this.width/2, this.height/2),
    this.springPoint.radius = 5;

    this.weight = new Particle(Math.random() * this.width, Math.random() * this.height, 50, Math.random() * Math.PI * 2, 0.75 ),
    this.weight.radius = 20;
    this.weight.friction = 0.95;

    this.k = 0.1,
    this.springLength = 100;

    this.init();
    this.onMouseClick();
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  init() {
    this.weight.addSpring(this.springPoint, this.k, this.springLength);
  }

  onMouseClick() {
    document.addEventListener('mousemove', (event) => {
      this.springPoint.x = event.clientX;
      this.springPoint.y = event.clientY;
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    
    this.weight.update();
    this.weight.drawParticle(this.context);

    this.springPoint.drawParticle(this.context);  

    // Line between weight and springPoint
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.moveTo(this.weight.x, this.weight.y);
    this.context.lineTo(this.springPoint.x, this.springPoint.y);
    this.context.stroke();
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
} 
