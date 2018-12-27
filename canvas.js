class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.x = 0;
    this.y = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.angle = 0;
    this.radius = 20;
    this.speed = 0.1;

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', () => this.onResize());
    this.onResize();

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  
  onMouseMove(event) {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
  }

  update() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.x = this.cursorX + Math.cos(this.angle) * this.radius;
    this.y = this.cursorY + Math.sin(this.angle) * this.radius;


    this.context.beginPath();
    this.context.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
    this.context.fill();

    this.angle += this.speed;
    requestAnimationFrame(this.updateBound);
  }
}
