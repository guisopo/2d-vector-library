import { Canvas } from './canvas';
import { Particle } from './particle';
import { clamp } from './formulas';

class ClampExample extends Canvas {
  constructor() {
    super();

    this.rectangle = {
      x: this.canvas.width / 2 - 200,
      y: this.canvas.height / 2 - 150,
      width: 400,
      height: 300
    }

    this.particle = new Particle({
      position: { x: this.canvas.width / 2, y: this.canvas.height / 2},
      particleColor: '#fdf498'
    });

  }

  bindAll() {
    [ 'draw', 'render', 'addEventListeners', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  draw() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set canvas background color
    this.context.fillStyle='#fdf498';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set rectangle background color
    this.context.fillStyle='#f37736';
    this.context.fillRect(this.rectangle.x - 10, this.rectangle.y - 10, this.rectangle.width + 20, this.rectangle.height + 20);

    this.particle.drawParticle(this.context);

  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  addEventListeners() {
   document.body.addEventListener('mousemove', (e)=> {
     // Clamp particle position to rectangle area
    this.particle.position.x = clamp(e.clientX, this.rectangle.x, this.rectangle.x + this.rectangle.width);
    this.particle.position.y = clamp(e.clientY, this.rectangle.y, this.rectangle.y + this.rectangle.height);
   })
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.render();
  }
}

const recClamp = new ClampExample();

recClamp.init();