window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      numberOfParticles = 3;
      particles = [],

      radius = 5,
      friction = 0.9,
      k = 0.01,
      separation = 250;

  // CREATE PARTICLES
  for(let p = 0; p < numberOfParticles; p++) {
    particle = new Particle(utils.randomRange(0, width), 
                            utils.randomRange(0, height), 
                            utils.randomRange(0, 50),
                            utils.randomRange(0, Math.PI * 2),
                            0
                          );
    particle.friction = friction;
    particle.radius = radius;
    particles.push(particle);
    particle.index = particles.indexOf(particle);
  };

  // ADD PARTICLES
  document.addEventListener('click', function(event) {
    newParticle = new Particle(event.x, 
                              event.y, 
                              utils.randomRange(0, 50),
                              utils.randomRange(0, Math.PI * 2),
                              0
                          );
    newParticle.friction = friction;
    newParticle.radius = radius;
    particles.push(newParticle);
    newParticle.index = particles.indexOf(newParticle);
  });
  
  update();

  // ANIMATE AND UPDATE THEM
  function update() {
    context.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
      for(let i = 0; i < particles.length; i++) {
        if( particle.index !== i){
          particle.springTo(particles[i], k, separation);
        }
      }
    });
    
    particles.forEach(particle => {
     
      particle.update();
      drawParticle(particle.x, particle.y, particle.radius);

      checkEdges(particle);
      
    });

    requestAnimationFrame(update);
  }

  // DRAW PARTICLES
  function drawParticle(positionX, positionY, particleRadius) {
    context.beginPath();
    context.arc(positionX, positionY, particleRadius, 0, Math.PI * 2, false);
    context.fill();
  }

  // CHECK FLOOR
  function checkEdges(particle) {
		if(particle.y + particle.radius > height) {
			particle.y = (height - particle.radius);
			particle.vy = (particle.vy * -0.95);
		}
	}


};