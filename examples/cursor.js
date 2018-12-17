// TO DO
// Update functionality to be able to add any number of weights ('followers')
// Create canvas class with resize event listener

window.onload = function() {
	var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      springPoint = new Particle(Math.random() * width, Math.random() * height, 0, 0),
      weight = new Particle(Math.random() * width, Math.random() * height, 0, 0),
      // weight2 = new Particle(Math.random() * width, Math.random() * height, 0, 0),

      k = 1,
      springLength = 0,
      minRadius = 25,
      maxRadius = 60;

  weight.radius = minRadius;
  weight.friction = 0.1;
  // weight2.friction = 0.06;
  weight.addSpring(springPoint, k, springLength);
  // weight2.addSpring(weight, k, springLength);

  
  document.addEventListener('mousemove', function(event) {
    springPoint.x = event.x;
    springPoint.y = event.y;
  });

	update();

	function update() {
    context.clearRect(0, 0, width, height);
    
    speed = weight.getSpeed();

    weight.radius = utils.map(speed, 0, 90, minRadius, maxRadius);
    weight.update();
    // weight2.update();
    
    // Weight 2 (Follower)
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
    context.fill();
    // Weight 2 (Follower 2)
    // context.globalCompositeOperation = 'difference';
		// context.beginPath();
    // context.arc(weight2.x, weight2.y, weight.radius, 0, Math.PI * 2, false);
    // context.fill();
    
    // Spring Point (Pointer)
    context.globalCompositeOperation = 'xor';
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.x, springPoint.y, 5, 0, Math.PI * 2, false);
    context.fill();
    requestAnimationFrame(update);
	}


};
