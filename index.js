class Arrow {
  constructor(options = {}) {
    this.options = {
      canvas: options.canvas || document.getElementById('canvas'),
    };
        
    this.context = this.options.canvas.getContext('2d');
    // this.dpr = window.devicePixelRatio || 1;
    this.dpr = 1;
  }

  bindAll() {
    ['render', 'calculateAngle', 'setCanvas', 'addEvents']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setCanvas() {
    this.options.canvas.width = window.innerWidth * this.dpr;
    this.options.canvas.height = window.innerHeight * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }

  setArrowPosition() {
    this.arrowX = this.options.canvas.width / 2;
    this.arrowY = this.options.canvas.height / 2;
  }

  drawArrow() {
    this.context.beginPath();
    this.context.moveTo(20, 0);
    this.context.lineTo(-20, 0);
    this.context.moveTo(20, 0);
    this.context.lineTo(10, -10);
    this.context.moveTo(20, 0);
    this.context.lineTo(10, 10);
    this.context.stroke()
  }

  render() {
    this.context.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);

    this.context.save();
    this.context.translate(this.arrowX, this.arrowY);
    this.context.rotate(this.angle);

    this.drawArrow();
    
    this.context.restore();

    requestAnimationFrame(this.render);
  }

  calculateAngle(e) {
    this.centerX = e.clientX - this.arrowX;
    this.centerY = e.clientY - this.arrowY;
    this.angle = Math.atan2(this.centerY, this.centerX);
  }

  addEvents() {
    this.options.canvas.addEventListener('mousemove', this.calculateAngle, {passive: true});
    window.addEventListener('resize', this.setBounds);
  }
  
  init() {
    this.bindAll();
    this.setCanvas();
    this.setArrowPosition();
    this.addEvents();
    this.render();
  }
}

window.onload = function() {

  const arrow = new Arrow();

  arrow.init();
}