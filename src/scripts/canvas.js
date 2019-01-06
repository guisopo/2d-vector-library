export class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    
    document.body.appendChild(this.canvas);
    
    window.addEventListener('resize', () => this.onResize());
    this.onResize();
    
    // this.updateBound = this.update.bind(this);
    // requestAnimationFrame(this.updateBound);
  }
  
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }

  // update() {
  //   this.context.clearRect(0, 0, this.width, this.height);

  //   requestAnimationFrame(this.updateBound);
  // }
}
