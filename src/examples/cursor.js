import { Canvas } from '../scripts/canvas.js';
import { Particle } from '../scripts/particle.js';
import * as utils from '../scripts/utils.js';

export class Cursor extends Canvas {
	constructor() {
    super();
    
		this.springPoint = new Particle(Math.random() * this.width, Math.random() * this.height, 0, 0),
    this.weight = new Particle(Math.random() * this.width, Math.random() * this.height, 0, 0),
	
    this.k = 0.09;
    this.springLength = 0;
    this.minRadius = 25;
    this.maxRadius = 60;

    this.weight.radius = this.minRadius;
    this.weight.friction = 0.1;

    
		this.init();
		this.onMouseMove(this.springPoint);
		this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }
  
  init() {
    this.weight.addSpring(this.springPoint, this.k, this.springLength);
  }

	onMouseMove(springPoint) {
		document.addEventListener('mousemove', function(event) {
      springPoint.x = event.x;
      springPoint.y = event.y;
    });
	}

	draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    // let speed = this.weight.getSpeed();
    // this.weight.radius = utils.map(speed, 0, 90, this.minRadius, this.maxRadius);
    this.weight.update();

    this.context.beginPath();  
    this.context.fillStyle = 'black';
    this.context.arc(this.weight.x, this.weight.y, this.weight.radius, 0, Math.PI * 2, false);
    this.context.fill();

    this.context.globalCompositeOperation = 'xor';
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.arc(this.springPoint.x, this.springPoint.y, 5, 0, Math.PI * 2, false);
    this.context.fill();

  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}