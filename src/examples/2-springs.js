import { Particle } from '../scripts/particle.js';
import { Canvas } from '../scripts/canvas.js';
import * as utils from '../scripts/utils.js';

class Springs extends Canvas {
  constructor() {
    super();
    
    this.springPoint = {
      x: this.width / 2,
      y: this.height / 2 
    };

    this.springPoint2 = {
      x: utils.randomRange(0, this.width),
      y: utils.randomRange(0, this.height),
    };

    this.weight = new Particle(Math.random() * this.width, Math.random() * this.height, 0, 0, 0);
    this.weight.radius = 20;
    this.weight.friction = 0.75;
    
    this.k = 0.1;
    this.springRadius = 6;
    this.springLength = 6;

    this.init();
		this.onMouseMove(this.springPoint);
		this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  init() {
    this.weight.addSpring(this.springPoint, this.k, this.springLength);
    this.weight.addSpring(this.springPoint2, this.k, this.springLength);
  }

	onMouseMove() {
		document.addEventListener('mousemove', (event) => {
      this.springPoint.x = event.clientX;
      this.springPoint.y = event.clientY;
    });
	}

	draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    
    this.context.globalCompositeOperation = 'xor';

    this.weight.update();

    // Spring1 Point
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.arc(this.springPoint.x, this.springPoint.y, this.springRadius, 0, Math.PI * 2, false);
    this.context.fill();

    // Spring2
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.arc(this.springPoint2.x, this.springPoint2.y, this.springRadius, 0, Math.PI * 2, false);
    this.context.fill();

    // Weight
    this.weight.drawParticle(this.context);
    
    // Line between Springs and Weight
    this.context.beginPath();
    this.context.moveTo(this.springPoint2.x, this.springPoint2.y);
    this.context.lineTo(this.weight.x, this.weight.y);
    this.context.lineTo(this.springPoint.x, this.springPoint.y);
    this.context.stroke();
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}