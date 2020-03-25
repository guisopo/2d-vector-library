import { Canvas } from './canvas';
import { Particle } from './particle';
import { roundNearest } from './utils';

class SnapGrid extends Canvas {
  constructor() {
    super();

    const cursorOptions = {
      position: { x: this.canvas.width/2 + 200, y: this.canvas.height/2 },
      size: 5,
    }

    this.cursor = new Particle(cursorOptions);
    this.gridSize = 40;
  }

  bindAll() {
    [ 'draw', 'render', 'addEventListeners', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.context.beginPath();
    this.context.strokeStyle='#eaeaea';
    for(let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.width);
    }
    for(let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
    }
    this.context.stroke();
		
    this.cursor.drawParticle(this.context);
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  addEventListeners() {
   document.body.addEventListener('mousemove', (e) => {
    this.cursor.position.x = roundNearest(e.clientX, this.gridSize);
    this.cursor.position.y = roundNearest(e.clientY, this.gridSize);
   });
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.render();
  }
}