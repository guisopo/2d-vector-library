class Canvas {
  constructor(options={}) {
    this.options = {
      canvas: options.canvas || document.getElementById('canvas')
    };
    this.context = this.options.canvas.getContext('2d');
    // this.dpr = window.devicePixelRatio || 1;
    this.dpr = 1;
    
    this.setCanvas();
  }

  setCanvas() {
    this.options.canvas.width = window.innerWidth * this.dpr;
    this.options.canvas.height = window.innerHeight * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }
}

export { Canvas };