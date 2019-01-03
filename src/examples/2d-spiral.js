window.onload = function() {
	const canvas = document.getElementById("canvas"),
				context = canvas.getContext("2d"),
				width = canvas.width = window.innerWidth,
				height = canvas.height = window.innerHeight;
				focalLength = 300,
				particles = [],
				numberOfParticles = 200,
				centerZ = 2000,
				radius = 1000,
				baseAngle = 0,
				rotationSpeed = 0.01;

	for(let i = 0; i < numberOfParticles; i++) {
		const particle = {
			angle: 0.2 * i,
			y: 2000 - 4000 / numberOfParticles * i
		};
		particle.x = Math.cos(particle.angle + baseAngle) * radius;
		particle.z = centerZ + Math.sin(particle.angle + baseAngle) * radius;
		particles.push(particle);
	}	

	context.translate(width/2, height/2);

	document.addEventListener('mousemove', function(event) {
		rotationSpeed = (event.clientX - width/2) * 0.00005;
		yPos = (event.clientY - height / 2) * 2;
	});

	update();
	
	function update() {
		baseAngle += rotationSpeed;
		context.clearRect(-width/2, -height/2, width, height);

		particles.forEach(particle => {
			const perspective = focalLength / (focalLength + particle.z);
			context.save();
			context.scale(perspective, perspective);
			context.translate(particle.x, particle.y);

			context.beginPath();
			context.arc(0, 0, 20, 0, Math.PI * 2, false);
			context.fill();
			
			context.restore();
			
			particle.x = Math.cos(particle.angle + baseAngle) * radius;
			particle.z = centerZ + Math.sin(particle.angle + baseAngle) * radius;
			
		});
		
		requestAnimationFrame(update);
	}
	
};