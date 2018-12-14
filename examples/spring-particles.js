window.onload = function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      particleA = new Particle(utils.randomRange(0, width), 
                                  utils.randomRange(0, height), 
                                  utils.randomRange(0, 50),
                                  utils.randomRange(0, Math.PI * 2)),
      particleB = new Particle(utils.randomRange(0, width), 
                                  utils.randomRange(0, height), 
                                  utils.randomRange(0, 50),
                                  utils.randomRange(0, Math.PI * 2)),
      particleC = new Particle(utils.randomRange(0, width), 
                                  utils.randomRange(0, height), 
                                  utils.randomRange(0, 50),
                                  utils.randomRange(0, Math.PI * 2)),
      particleD = new Particle(utils.randomRange(0, width), 
                                  utils.randomRange(0, height), 
                                  utils.randomRange(0, 50),
                                  utils.randomRange(0, Math.PI * 2)),
      k = 0.01,
      separation = 100;
  
  particleA.friction = 0.9;
  particleA.radius = 20;

  particleB.friction = 0.9;
  particleB.radius = 20;

  particleC.friction = 0.9;
  particleC.radius = 20;

  particleD.friction = 0.9;
  particleD.radius = 20;
  
  update();
  

  function update() {
    context.clearRect(0, 0, width, height);

    // spring(particleA, particleB, separation);
    // spring(particleB, particleC, separation);
    // spring(particleC, particleD, separation);
    // spring(particleD, particleA, separation);
    // spring(particleD, particleB, separation);
    // spring(particleA, particleC, separation);
    particleA.springTo(particleB, k, separation);
    particleB.springTo(particleC, k, separation);
    particleC.springTo(particleD, k, separation);
    particleD.springTo(particleA, k, separation);

    particleD.springTo(particleB, k, separation);
    particleA.springTo(particleC, k, separation);

    particleA.update();
    particleB.update();
    particleC.update();
    particleD.update();

    context.beginPath();
    context.fillStyle = 'yellow';
    context.arc(particleA.x, particleA.y, particleA.radius, 0, Math.PI * 2, false);
    context.fill();
    
    context.beginPath();
    context.fillStyle = 'green';
    context.arc(particleB.x, particleB.y, particleB.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = 'red';
    context.arc(particleC.x, particleC.y, particleB.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = 'blue';
    context.arc(particleD.x, particleD.y, particleD.radius, 0, Math.PI * 2, false);
    context.fill();

    // context.beginPath();
    // context.moveTo(particleA.x, particleA.y);
    // context.lineTo(particleB.x, particleB.y);
    // context.lineTo(particleC.x, particleC.y);
    // context.lineTo(particleD.x, particleD.y);
    // context.lineTo(particleA.x, particleA.y);
    // context.stroke();
    requestAnimationFrame(update);
  }

  function spring(p0, p1, separation) {
    var distance = p0.position.subtract(p1.position);
    distance.setLength(distance.getLength() - separation);

    var springForce = distance.multiply(k);

    p1.velocity.addTo(springForce);
    p0.velocity.subtractFrom(springForce);
  }

};