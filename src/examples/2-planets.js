import { Particle } from '../scripts/particle.js';
import { Canvas } from '../scripts/canvas.js';
import * as utils from '../scripts/utils.js';

class Planets extends Canvas {
  constructor() {
    super();

    this.sun1 = new Particle(300, 200, 0, 0);
    this.sun2 = new Particle(800, 600, 0, 0);
    this.emitter = {
			x: 100,
			y: 0
    };

    this.particles = [],
		this.numParticles = 500;

    this.sun1.mass = 10000;
    this.sun1.radius = 10;
    this.sun2.mass = 20000;
    this.sun2.radius = 20;
    

    this.init();
		this.onMouseMove(this.springPoint);
		this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  init() {
		// Create particles
    for(let i = 0; i < this.numParticles; i += 1) {
      let p = new Particle(this.emitter.x, this.emitter.y, utils.randomRange(7, 8), Math.PI / 2 + utils.randomRange(-0.1, 0.1));
      p.addGravitation(this.sun1);
      p.addGravitation(this.sun2);
      p.radius = 3;
      this.particles.push(p);
    }
  }

	onMouseMove() {
		document.addEventListener('mousemove', (event) => {
      this.sun2.x = event.x;
      this.sun2.y =  event.y;
    });
	}

	draw() {
		this.context.clearRect(0, 0, this.width, this.height);
		
    this.sun1.drawParticle(this.context);
		this.sun2.drawParticle(this.context);
		
    this.particles.forEach( p => {
      p.update();
			p.drawParticle(this.context);
			// Reposition particle to the emiter position when goes beyond canvas
			if(	p.x > this.width ||
					p.x < 0 ||
					p.y > this.height ||
					p.y < 0) {
					p.x = this.emitter.x;
					p.y = this.emitter.y;
					p.setSpeed(utils.randomRange(7, 8));
					p.setDirection(Math.PI / 2 + utils.randomRange(-.1, .1));
			}
    })
  }
  
  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }
}
