import { Canvas } from '../scripts/canvas.js';
import { noise } from '../scripts/perlin-noise.js';

export class noiseBubles extends Canvas {
  constructor() {
    super();
    this.x;
    this.y;
    // this.particle = new Particle(this.width/2, this.height/2, 0, 0, 0);
    this.radius = 100;
    this.time = 0;
    this.number = 100;
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.translate(this.width/2, this.height/2);
    
    this.context.fillStyle = '#FF0000';
    this.context.beginPath();
    for(let i = 0; i < this.number; i++) {
      let angle = i * Math.PI * 2 / this.number;
      // this.x = this.radius * Math.sin(angle) + 10 * noise(i/10, this.time/10, 0);
      // this.y = this.radius * Math.cos(angle) + 10 * noise(i/10, this.time/10, 0);
      // this.x = this.radius * Math.sin(angle) + 7   * noise(this.radius * Math.sin(angle), this.time/10, 0);
      // this.y = this.radius * Math.cos(angle) + 7   * noise(this.radius * Math.cos(angle), this.time/10, 0);
      this.x = this.radius * Math.sin(angle) + 40 * noise(Math.sin(angle), this.time/100, 0);
      this.y = this.radius * Math.cos(angle) + 40 * noise(Math.cos(angle), this.time/100, 0);
      
      this.context.lineTo(this.x, this.y);
      
    }
    this.context.closePath();
    this.context.fill();

    this.context.fillStyle = '#000000';
    this.context.beginPath();
    for(let i = 0; i < this.number; i++) {
      let angle = i * Math.PI * 2 / this.number;
      this.x = this.radius * Math.sin(angle) + 40 * noise(Math.sin(angle) + this.time/100, this.time/100, 0);
      this.y = this.radius * Math.cos(angle) + 40 * noise(Math.cos(angle) + this.time/100, this.time/100, 0);
      
      this.context.lineTo(this.x, this.y);
      
    }
    this.context.closePath();
    this.context.fill();

  this.context.fillStyle = '#00FF00';
    this.context.beginPath();
    for(let i = 0; i < this.number; i++) {
      let angle = i * Math.PI * 2 / this.number;
      this.x = (this.radius - 5) * Math.sin(angle) + 40 * noise(Math.sin(angle) + 2 * this.time/100, this.time/100, 0);
      this.y = (this.radius - 5) * Math.cos(angle) + 40 * noise(Math.cos(angle) + 3 * this.time/100, this.time/100, 0);
      
      this.context.lineTo(this.x, this.y);
      
    }
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  render() {
    this.draw();
    this.time += 1;
    requestAnimationFrame(this.updateRender);
  }

}

