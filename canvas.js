class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', () => this.onResize());
    this.onResize();

    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}
