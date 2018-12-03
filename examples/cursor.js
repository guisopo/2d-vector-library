window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      springPoint = vector.create(width/2, height/2),
      weight = particle.create(Math.random() * width, Math.random() * height, 0, 0),
      k = 0.1;

  var minRadius = 10;
  var maxRadius = 20;
  weight.radius = minRadius;
  weight.friction = 0.67;
  
  document.addEventListener('mousemove', function(event) {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });
  
  update();

  function update() {
    context.clearRect(0, 0, width, height);
    
    var distance = springPoint.subtract(weight.position),
        springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    weight.radius = utils.clamp(weight.velocity.getLength(), minRadius, maxRadius);

    weight.update();
    context.globalCompositeOperation = 'xor';
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.getX(), springPoint.getY(), 6, 0, Math.PI * 2, false);
    context.fill();
    
    // context.beginPath();
    // context.lineWidth = 1;
    // context.moveTo(weight.position.getX(), weight.position.getY());
    // context.lineTo(springPoint.getX(), springPoint.getY());
    // context.stroke();

    requestAnimationFrame(update);
  }
};