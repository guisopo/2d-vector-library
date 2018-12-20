window.onload = function() {
	const canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

    // Number of particles
      particlesH = 100,
      particlesV = 100,

    // Margin between particles
      marginH = width / particlesH,
      marginV = height / particlesV,

      particles = [],
      target = new Particle(0, 0, 0, 0);
    let   targetK = -0.4,
          springDistance = 60;

  // Create grid
  for (let i = 0; i < particlesH; i++) {
    for (let j = 0; j < particlesV; j++) {
      p = new Particle (i * marginH + marginH/2, j * marginV + marginV/2, 0, 0);

      p.friction = 0.9;
      p.setSpringTarget(p.x, p.y, 0.02);
      
      particles.push(p);
      
    }
  }

  document.body.addEventListener('mousemove', function(event) {
    target.x = event.clientX;
    target.y = event.clientY;
  });
  document.body.addEventListener('mousedown', function() {
    // targetK = -15;
    springDistance = 300;
  });
  document.body.addEventListener('mouseup', function() {
    // targetK = -0.4;
    springDistance = 60;
  });

	update();

	function update() {
    context.clearRect(0, 0, width, height);

    particles.forEach(particle => {
      // particle.springFrom(particle, 0.02);
      particle.springFrom(target, targetK, springDistance);
      
      particle.update();
      context.beginPath();
      context.arc(particle.x, particle.y, 1, 0, Math.PI * 2, false);
      context.fill();
    })
    
    requestAnimationFrame(update);
	}


};
