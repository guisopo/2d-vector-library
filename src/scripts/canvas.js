export class Canvas {
  constructor(options = {}) {
    const { 
      height = window.innerHeigh, 
      width = window.innerWidth 
    } = options;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.height = height;
    this.width =  width;
    this.dpr = window.devicePixelRatio;
    
    this.init();
    window.addEventListener('resize', () => this.onResize());
    
  }

  init() {
    this.onResize();
    document.body.appendChild(this.canvas);
  }
  
  onResize() {
    this.width = this.width;
    this.height = this.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }
}
