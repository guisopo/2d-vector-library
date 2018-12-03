window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      springPoint = vector.create(width/2, height/2),
      weight = particle.create(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2, 0.75 ),
      k = 0.1,
      springLength = 100;

  weight.radius = 20;
  weight.friction = 0.95;
  update();

  document.addEventListener('mousemove', function(event) {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });

  function update() {
    context.clearRect(0, 0, width, height);

    var distance = springPoint.subtract(weight.position);

    distance.setLength(distance.getLength() - springLength); 

    var springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);
    weight.update();
    
    // context.globalCompositeOperation = 'xor';
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.getX(), springPoint.getY(), 6, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(weight.position.getX(), weight.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();

    requestAnimationFrame(update);
  }
};