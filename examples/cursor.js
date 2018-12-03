window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      springPoint = vector.create(width/2, height/2),
      weight = particle.create(Math.random() * width, Math.random() * height, 0, 0),
      
      k = 0.1,
      minRadius = 12,
      maxRadius = 20;

  weight.radius = minRadius;
  weight.friction = 0.67;
  
  document.addEventListener('mousemove', function(event) {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });
  
  update();

  function update() {
    context.clearRect(0, 0, width, height);
    
    context.globalCompositeOperation = 'xor';

    // Spring Effect Opertations
    var distance = springPoint.subtract(weight.position),
        springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    // Mapping Weight Radius to it's Velocity 
    weight.radius = utils.clamp(weight.velocity.getLength(), minRadius, maxRadius);

    weight.update();


    // Spring Point (Pointer)
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.getX(), springPoint.getY(), 6, 0, Math.PI * 2, false);
    context.fill();

    // Weight (Follower)
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();
    
    // Line between Spring Point and Weight
    // context.beginPath();
    // context.lineWidth = 1;
    // context.moveTo(weight.position.getX(), weight.position.getY());
    // context.lineTo(springPoint.getX(), springPoint.getY());
    // context.stroke();

    requestAnimationFrame(update);
  }
};