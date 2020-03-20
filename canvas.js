class Canvas {
  constructor(options={}) {
    this.options = {
      canvas: options.canvas || document.getElementById('canvas'),
      animate: options.animate
    };
    this.context = this.options.canvas.getContext('2d');
    // this.dpr = window.devicePixelRatio || 1;
    this.dpr = 1;
  }

  bindAll() {
    ['render', 'setCanvas', 'addEvents']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  setCanvas() {
    this.options.canvas.width = window.innerWidth * this.dpr;
    this.options.canvas.height = window.innerHeight * this.dpr;

    this.context.scale(this.dpr, this.dpr);
  }

  render() {
    this.context.clearRect(0, 0, this.options.canvas.width, this.options.canvas.height);

    this.options.animate;

    requestAnimationFrame(this.render);
  }

  addEvents() {

  }

  init() {
    this.bindAll();
    this.setCanvas();
    this.addEvents();
    this.render();
  }
}

export { Canvas };