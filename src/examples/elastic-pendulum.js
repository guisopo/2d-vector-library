window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      springPoint = new Particle(width/2, height/2),
      weight = new Particle(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2, 0.75 ),

      k = 0.1,
      springLength = 100;

  weight.radius = 20;
  weight.friction = 0.95;
  
  update();

  document.addEventListener('mousemove', function(event) {
    springPoint.x = event.clientX;
    springPoint.y = event.clientY;
  });

  function update() {
    context.clearRect(0, 0, width, height);

    weight.springTo(springPoint, k, springLength);
    weight.update();
    
    // context.globalCompositeOperation = 'xor';
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(springPoint.x, springPoint.y, 6, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(weight.x, weight.y);
    context.lineTo(springPoint.x, springPoint.y);
    context.stroke();

    requestAnimationFrame(update);
  }
};