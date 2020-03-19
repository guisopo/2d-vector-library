class mouseParticles {
  constructor(options = {}) {
    this.options = {
      canvas: options.canvas || document.getElementById('canvas'),
    };
    
    this.canvasSize = {};
    
    this.context = this.options.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
  }

  bindAll() {
    ['render', 'updateMouseCoords', 'setBounds', 'addEvents']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setBounds() {
    this.options.canvas.width = window.innerWidth * this.dpr;
    this.options.canvas.height = window.innerHeight * this.dpr;  
  }

  render() {
    this.context.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);
    
    this.context.fill();

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

  
}