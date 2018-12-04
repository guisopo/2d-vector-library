window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      springPoint = {
        x: width / 2,
        y: height / 2 
      },

      springPoint2 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height),
      },

      weight = particle.create(Math.random() * width, Math.random() * height, 0, 0),
      
      k = 0.1,
      springRadius = 6
      springLength = 6;

  weight.radius = 20;
  weight.friction = 0.75;
  weight.addSpring(springPoint, k, springLength);
  weight.addSpring(springPoint2, k, springLength);
  
  document.addEventListener('mousemove', function(event) {
    springPoint.x = event.clientX;
    springPoint.y = event.clientY;
  });
  
  update();

  function update() {
    context.clearRect(0, 0, width, height);
    
    context.globalCompositeOperation = 'xor';

    weight.update();


    // Spring1 Point
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.x, springPoint.y, springRadius, 0, Math.PI * 2, false);
    context.fill();

    // Spring2 (Follower)
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint2.x, springPoint2.y, springRadius, 0, Math.PI * 2, false);
    context.fill();

    // Weight
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
    context.fill();

    
    // Line between Springs and Weight
    context.beginPath();
    context.moveTo(springPoint2.x, springPoint2.y);
    context.lineTo(weight.x, weight.y);
    context.lineTo(springPoint.x, springPoint.y);
    context.stroke();

    requestAnimationFrame(update);
  }
};