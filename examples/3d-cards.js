window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		focalLength = 300,
		cards = [],
		numberOfCards = 21;

	
		
	for( var i = 0; i <= numberOfCards; i++ ) {
		var card = {
			x: utils.randomRange(-1000, 1000),
			y: utils.randomRange(-1000, 1000),
			z: utils.randomRange(0, 5000),
			img: document.createElement('img')
		};
		card.img.src = 'postcard-' + (i % 7) + '.jpg';
		cards.push(card);
	}

	context.translate(width/2, height/2);

		
	function update() {
		cards.sort(zSort);
		context.clearRect(-width/2, -height/2, width, height);

		cards.forEach( card => {
			var card = cards[cards.indexOf(card)],
					perspective = focalLength / (focalLength + card.z);

			context.save();
			context.scale(perspective, perspective);
			context.translate(card.x, card.y);

			context.translate(-card.img.width / 2, -card.img.height / 2);
			context.drawImage(card.img, 0, 0, 700, 900);
			
			context.restore();

			card.z += 10;

			if(card.z > 5000) {
				card.z = 0;
			}
			// console.log(card);
		}); 

		requestAnimationFrame(update);
	}

	function zSort(cardA, cardB) {
		return cardB.z - cardA.z;
	}

	update();
};