class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d');
    // this.dpr = window.devicePixelRatio || 1;
    this.dpr = 1;
    
    this.setCanvas();
    window.addEventListener('resize', () => this.setCanvas());
  }

  setCanvas() {
    this.canvas.width = window.innerWidth * this.dpr;
    this.canvas.height = window.innerHeight * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }
}

export { Canvas };