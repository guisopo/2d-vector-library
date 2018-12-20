// TO DO
// Update functionality to be able to add any number of weights ('followers')
// Create canvas class with resize event listener

window.onload = function() {
	var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      particlesH = 40,
      particlesV = 40,
      marginH = width / particlesH,
      marginV = height / particlesV,
      particles = [];

  for (let i = 0; i < particlesH; i++) {
    for (let j = 0; j < particlesV; j++) {
      p = new Particle (i * marginH + marginH/2, j * marginV + marginV/2, 0, 0);
      particles.push(p);
    }
  }

  console.log(particles);
	update();

	function update() {
    context.clearRect(0, 0, width, height);

    particles.forEach(particle => {
      context.beginPath();
      context.arc(particle.x, particle.y, 2, 0, Math.PI * 2, false);
      context.fill();
    })
    
    requestAnimationFrame(update);
	}


};
