import { Canvas } from './canvas';
import { Particle } from './particle';
import { randomRange } from './utils';

class multiGravity extends Canvas {
  constructor() {
    super();

    this.sun1 = new Particle( {
      size: 20,
      mass: 5000,
      position: {x: 200, y: 300}
    });

    this.sun2 = new Particle({
      size: 10,
      mass: 3000,
      position: {x: this.canvas.width, y: this.canvas.height},
    });

    this.emiter = {
      x: 100,
      y: 0
    };

    this.particles = [];
    this.numParticles = 10;
    document.body.style.cursor = 'none';
  }

  bindAll() {
    [ 'draw', 'render', 'addEventListeners', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = new Particle({
        position: { x: this.emiter.x, y: this.emiter.y },
        size: 3,
        speed: randomRange(7, 8),
        direction: Math.PI/2 + randomRange(-.1, .1)
      });

      particle.addGravitation(this.sun1);
      particle.addGravitation(this.sun2);
      
      this.particles.push(particle);
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.sun1.drawParticle(this.context);
    this.sun2.update();
    this.sun2.drawParticle(this.context);

    this.particles.forEach(particle => {
      particle.update();
      particle.drawParticle(this.context);
      this.startAgain(particle);
    });
  }

  startAgain(particle) {
    if(particle.position.x > this.canvas.width ||
       particle.position.x < 0 ||
       particle.position.y > this.canvas.height ||
       particle.position.y < 0) {

      particle.position.x = this.emiter.x;
      particle.position.y = this.emiter.y;
      particle.setSpeed = randomRange(7, 8);
      particle.setHeading = Math.PI/2 + randomRange(-0.1, 0.1);
    }
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.render);
  }

  addEventListeners() {
    document.body.addEventListener('mousemove', (e) => {
      this.sun2.position.x = e.clientX;
      this.sun2.position.y = e.clientY;
    });
  }

  init() {
    this.bindAll();
    this.addEventListeners();
    this.createParticles();
    this.render();
  }
}


const a = new multiGravity();
a.init();