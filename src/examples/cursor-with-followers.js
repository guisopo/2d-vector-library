window.onload = function() {
	var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
			height = canvas.height = window.innerHeight,

			target = {
				x: null,
				y: null
			},

			points = [],
			numPoints = 6,
			ease = 0.65,
			easing = true;
	
	for(var i = 0; i < numPoints; i++) {
		points.push({
			x: null,
			y: null
		})
	}

	document.addEventListener('mousemove', function(event) {
		target.x = event.x;
		target.y =  event.y;

		if(!easing) {
			easing = true;
			update();
		}
	})



	update();

	function update() {
		context.clearRect(0, 0, width, height);
		
		var leader = {
			x: target.x,
			y: target.y
		};

		points.forEach(point => {
			var i = points.indexOf(point) + 1;
			point.x += (leader.x - point.x) * ease;
			point.y += (leader.y - point.y) * ease;

			context.beginPath();
			context.arc(point.x, point.y, (4 + 1/i), 0, Math.PI * 2, false);
			context.fill();

			leader.x = point.x;
			leader.y = point.y;
			
		});

		if(easing) {
			requestAnimationFrame(update);
		}
	}

	// function easeTo(position, target, ease) {
	// 	var dx = target.x - position.x,
	// 			dy = target.y - position.y;

	// 	position.x += (target.x - position.x) * ease;
	// 	position.y += (target.y - position.y) * ease;

	// 	if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 ) {
	// 		position.x = target.x;
	// 		position.y = target.y;
	// 		return false;
	// 	}
	// 	return true;
	// }

};