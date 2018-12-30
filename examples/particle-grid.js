window.onload = function() {
	const canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        
        canvas2 = document.getElementById("canvas2"),
        context2 = canvas2.getContext("2d");
        canvas2.width = width;
        canvas2.height = height;


    // Number of particles
    const  particlesH = 30,
           particlesV = 30,

    // Margin between particles
      marginH = width / particlesH,
      marginV = height / particlesV,

      particles = [],
      particles2 = [],
      target = new Particle(0, 0, 0, 0);

    let   targetK = -0.4,
          springDistance = 60;

  // Create grid
  for (let i = 0; i < particlesH; i++) {
    for (let j = 0; j < particlesV; j++) {
      p = new Particle (i * marginH + marginH/2, j * marginV + marginV/2, 0, 0);
      p.radius = 1.5;
      p.friction = 0.9;
      p.setSpringTarget(p.x, p.y, 0.02);
      
      particles.push(p);
      
    }
  }

  for (let i = 0; i < particlesH; i++) {
    for (let j = 0; j < particlesV; j++) {
      p = new Particle (i * marginH , j * marginV , 0, 0);
      p.radius = 1.5; 
      p.friction = 0.9;
      p.setSpringTarget(p.x, p.y, 0.02);
      
      particles2.push(p);
      
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
      particle.update();
      particle.springFrom(target, targetK, springDistance);
      particle.drawParticle(context);
    });
    
    context2.clearRect(0, 0, width, height);

    particles2.forEach(particle => {
      particle.update();
      particle.springFrom(target, targetK, springDistance);
      particle.drawParticle(context2);
    });
    
    requestAnimationFrame(update);
	}


};
