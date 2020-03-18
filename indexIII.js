window.onload = function() {
  const canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight,
        numObjects = 10;

  const radius = 100,
        speed = 0.01,
        slice = Math.PI *2 / numObjects;
  
  var x = 0, 
      y = 0,
      angle = 0,
      centerX,
      centerY;
  
  render();

  function render() {
    context.clearRect(0, 0, width, height);

    angle += speed;

    for (let i = 0; i < numObjects; i++) {
      objAngle = i * slice + angle;
      x = centerX + Math.cos(objAngle) * radius;
      y = centerY + Math.sin(objAngle) * radius;
  
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2, false);
      context.fill();
    }
    
    
    requestAnimationFrame(render);
  }

  function updateMouseCoords(e) {
    centerX = e.clientX;
    centerY = e.clientY;
  }

  canvas.addEventListener('mousemove', updateMouseCoords);
}