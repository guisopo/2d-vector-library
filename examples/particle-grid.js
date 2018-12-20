// TO DO
// Update functionality to be able to add any number of weights ('followers')
// Create canvas class with resize event listener

window.onload = function() {
	var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      particlesH = 5,
      particlesV = 5,
      particles = [];

  for (let i = 0; i <= particlesH; i++) {
    for (let j = 0; j <= particlesV; j++) {
      p = new Particle (width/ i, height/ j, 0, 0);
      particles.push(p);
    }
  }


	update();

	function update() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    particles.forEach(particle => {
      context.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
    })
    context.fill();
    
    requestAnimationFrame(update);
	}


};
