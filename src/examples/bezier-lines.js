window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		
		p0 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		p1 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		};
		p2 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		};
		p3 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		maxT = 0,
		pFinal = {};
	
	
  document.addEventListener('mousemove', function(event) {
    p3.x = event.x;
    p3.y =  event.y;
  });


	update();

	function update() {
		context.clearRect(0, 0, width, height);

		context.beginPath();
		// Delete * and uncomment above line to see a drawing line between p0 and p3
		// context.moveTo(p0.x, p0.y); 
		
		for(var t = 0; t<=maxT; t+=0.01) {
			context.moveTo(p0.x, p0.y); //*
			utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
			context.lineTo(pFinal.x, pFinal.y);
		}
		context.stroke();

		maxT += 0.01;
		if(maxT > 1) {
			maxT = 1;
		}

		requestAnimationFrame(update);
	}

};