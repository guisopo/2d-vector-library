window.onload = function() {
  const canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const radius = 100,
        speed = 0.05;
  
  var x = 0, 
      y = 0,
      angle = 0,
      centerX,
      centerY;
  
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    x = centerX + Math.cos(angle) * radius;
    y = centerY + Math.sin(angle) * radius;

    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();

    angle += speed;
    
    requestAnimationFrame(render);
  }

  function updateMouseCoords(e) {
    centerX = e.clientX;
    centerY = e.clientY;
  }

  canvas.addEventListener('mousemove', updateMouseCoords);
}