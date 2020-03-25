import { Canvas } from './canvas';
import { Particle } from './particle';

class SolarSystem extends Canvas {
  constructor() {
    super();

    const sunOptions = {
      mass: 20000,
      size: 20,
      particleColor: '#ffff00',
      position: { x: this.canvas.width/2, y: this.canvas.height/2 }
    }

    const planetOptions = {
      position: { x: this.canvas.width/2 + 200, y: this.canvas.height/2 },
      size: 5,
      speed: 10,
      direction: -Math.PI / 2
    }

    this.sun = new Particle(sunOptions);
    this.planet = new Particle(planetOptions);
  }

  bindAll() {
    [ 'draw', 'render', 'addEventListeners', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  draw() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
    this.planet.gravitateTo(this.sun);
    this.planet.update();

    this.sun.drawParticle(this.context);
    this.planet.drawParticle(this.context);
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  addEventListeners() {
   
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.render();
  }
}

const sS = new SolarSystem();

sS.init();