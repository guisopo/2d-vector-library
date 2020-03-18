class mouseParticles {
  constructor(options = {}) {
    this.options = {
      canvas: options.canvas || document.getElementById('canvas'),
      numParticles: options.numParticles || 10,
      radius: options.radius || 100,
      speed: options.speed || 0.01,
    };
    
    this.canvasSize = {};
    
    this.context = this.options.canvas.getContext('2d');

    this.slice = Math.PI * 2 / this.options.numParticles;
    this.centerX;
    this.centerY;
    this.angle = 0;
  }

  bindAll() {
    ['render', 'updateMouseCoords', 'setBounds', 'addEvents']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setBounds() {
    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  render() {
    this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.angle += this.options.speed;

    let objAngle;

    for (let i = 0; i < this.options.numObjects; i++) {
      objAngle = i * slice + angle;
      x = this.centerX + Math.cos(objAngle) * this.options.radius;
      y = this.centerY + Math.sin(objAngle) * this.options.radius;
  
      this.context.beginPath();
      this.context.arc(x, y, 2, 0, Math.PI * 2, false);
      this.context.fill();
    }

    requestAnimationFrame(this.render);
  }

  updateMouseCoords(e) {
    this.centerX = e.clientX;
    this.centerY = e.clientY;
  }

  addEvents() {
    this.options.canvas.addEventListener('mousemove', this.updateMouseCoords, {passive: true});
    window.addEventListener('resize', this.setBounds);
  }
  
  init() {
    this.bindAll();
    this.setBounds();
    this.addEvents();
    this.render();
  }
}

window.onload = function() {

  const mP = new mouseParticles();

  mP.init();
}