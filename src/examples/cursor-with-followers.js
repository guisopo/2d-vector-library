import { Canvas } from '../scripts/canvas.js';

export class Cursor extends Canvas {
	constructor() {
		super();
		this.target = {
			x: null,
			y: null
		};
		this.pointsArray = [];
		this.numPoints = 6;
		this.ease = 0.65;
		this.easing = true;

		this.createFollowers();
		this.onMouseMove(this.target, this.easing);
		this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
	}

	onMouseMove(target, easing) {
		document.addEventListener('mousemove', function(event) {
			target.x = event.x;
			target.y =  event.y;
	
			if(!easing) {
				easing = true;
				this.render();
			}
		})
	}

	createFollowers() {
		for(var i = 0; i < this.numPoints; i++) {
			this.points.push({
				x: null,
				y: null
			})
		}
	}

	draw() {
    this.context.clearRect(0, 0, this.width, this.height);
		var leader = {
			x: target.x,
			y: target.y
		};
		this.points.forEach(point => {
			let i = points.indexOf(point) + 1;
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

  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
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