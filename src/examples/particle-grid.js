import { Particle } from './particle.js';

window.onload = function() {
	const canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

  // Number of particles
  const  numberParticles = 50,
        // Margin between particles
        marginH = width / numberParticles,
        marginV = height / numberParticles,

        particles = [],
        target = new Particle(0, 0, 0, 0);
        target.radius = 100;

  document.body.addEventListener('mousemove', function(event) {
    target.x = event.clientX;
    target.y = event.clientY;
  });

  document.body.addEventListener('mousedown', function() {
    target.radius = 300;
  });

  document.body.addEventListener('mouseup', function() {
    target.radius = 100;
  });
  
  // Initialize and create grid
  function init() {
    for (let i = 0; i < numberParticles; i++) {
      for (let j = 0; j < numberParticles; j++) {
        p = new Particle (i * marginH + marginH/2, j * marginV + marginV/2, 0, 0);
        p.radius = 1.5;
        p.friction = 0.9;
        
        p.setSpringTarget(p.x, p.y, 0.02);
        
        particles.push(p);  
      }
    }
  }


	function update() {
    context.clearRect(0, 0, width, height);

    particles.forEach(particle => {
      particle.think(target, target.radius);
      particle.update();
      particle.drawParticle(context);
    });
    
    requestAnimationFrame(update);
  }
  
  init();
  requestAnimationFrame(update);
};
