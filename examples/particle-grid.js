window.onload = function() {
	const canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

    // Number of particles
      particlesH = 5,
      particlesV = 5,

    // Margin between particles
      marginH = width / particlesH,
      marginV = height / particlesV,

      particles = [],
      target = new Particle(0, 0, 0, 0);

  // Create grid
  for (let i = 0; i < particlesH; i++) {
    for (let j = 0; j < particlesV; j++) {
      p = new Particle (i * marginH + marginH/2, j * marginV + marginV/2, 0, 0);

      p.friction = 0.9;
      p.hasSpringTarget = true;
      
      particles.push(p);
      
    }
  }

  document.body.addEventListener('mousemove', function(event) {
    target.x = event.clientX;
    target.y = event.clientY;
  });

	update();

	function update() {
    context.clearRect(0, 0, width, height);

    particles.forEach(particle => {
      particle.springFrom(particle, 0.02);
      particle.springFrom(target, 0.04, 20);
      
      particle.update();
      context.beginPath();
      context.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
      context.fill();
    })
    
    requestAnimationFrame(update);
	}


};
