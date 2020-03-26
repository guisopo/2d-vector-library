import { Canvas } from './canvas';
import { Particle } from './particle';

class SpringCursor extends Canvas {
  constructor(sizeCursor, sizeWeight, k, friction, exclude = false) {
    super();

    this.cursor = new Particle( {
      size: sizeCursor,
      position: {x: this.canvas.width / 2 + 100, y: this.canvas.height / 2 + 100}
    });

    this.weight = new Particle({
      size: sizeWeight,
      position: {x: this.canvas.width / 2, y: this.canvas.height / 2},
      friction: friction
    });

    this.exclude = exclude;

    this.weight.addSpring(this.cursor, k);

    document.body.style.cursor = 'none';
  }

  bindAll() {
    [ 'draw', 'render', 'addEventListeners', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.exclude ? this.context.globalCompositeOperation='xor' : '';
    
    this.weight.update();
    
    this.weight.drawParticle(this.context);
    this.cursor.drawParticle(this.context);
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  addEventListeners() {
    document.body.addEventListener('mousemove', (e) => {
      this.cursor.position.x = e.clientX;
      this.cursor.position.y = e.clientY;
    });
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.render();
  }
}

const sizeCursor = 7;
const sizeWeight = 20;
const k = 0.04;
const friction = 0.8;
const exclude = true;

const cursor = new SpringCursor(sizeCursor, sizeWeight, k, friction, exclude);

cursor.init();