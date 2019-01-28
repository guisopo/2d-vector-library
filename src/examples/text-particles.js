import { Canvas } from "./canvas.js";
import { Particle } from "./particle.js";

class Pixels extends Canvas{
  constructor() {
    super({height: 300});
    this.keyword 	= "Guille";
    this.canvas.width = this.canvasW;
		this.canvas.height  = this.canvasH;
    this.bgCanvas = document.createElement('canvas');
    this.bgContext  = this.bgCanvas.getContext('2d');
    this.bgCanvas.width = this.canvasW;
    this.bgCanvas.height  = this.canvasH;
    
		this.density 	= 6;
		this.particles 	= [];
		this.img;
		this.mouse = { x:0, y:0 };
		this.isDrawing	= false;
    this.canvasW = window.innerWidth;
    this.canvasH = 300;
    this.defaultFont	= 'Arial';
    
    this.updateRender = this.render.bind(this);
    requestAnimationFrame(this.updateRender);
    this.initialize();
  }

  initialize() {
		this.canvasW  = window.innerWidth;
		this.canvasH  = 300;
		this.canvas.width = this.canvasW;
		this.canvas.height  = this.canvasH;
		
		this.bgCanvas.width = this.canvasW;
		this.bgCanvas.height  = this.canvasH;
		
    this.mouseMove();
    this.mouseOut();
		
		this.prepare();
		this.setupParticles();
		this.draw();
  }

  prepare() {
    this.bgContext.font = "330px 'Helvetica Neue'";
    this.bgContext.fillText(this.keyword, ( this.canvasW / 2 ) - ( Math.round( this.bgContext.measureText(this.keyword).width/2 ) ) , 275 );
  }

  setupParticles() {
      
    let imageData, 
        image_Data, 
        pixel;
        //Get the image data - from (0,0) to the edges of the canvas
        imageData = this.bgContext.getImageData( 0, 0, this.canvasW, this.canvasH );
        image_Data= imageData.data;
    //Iterate horizontally over the image data
    for( let width = 0; width < this.canvasW; width += this.density ) {
      //Iterate vertically over image data 
      for( let height = 0; height < this.canvasH; height += this.density ) {
        //Get the pixel located at our current iteration
        pixel = image_Data[ ( ( width + ( height * this.canvasW ) ) * 4 ) - 1 ];
        //Pixel has been drawn on.
        if(pixel == 255) {
          //Add the coodinates and colour to our particle array.
          const particle = new Particle({x: width, y: height, radius:1});
          this.particles.push(
            particle
          );
        }
      }
    }

  }

  mouseMove(e) {
    document.addEventListener( 'mousemove', (e) => {
      this.mouse.x = e.offsetX || ( e.layerX - this.canvas.offsetLeft );
      this.mouse.y = e.offsetY || ( e.layerY - this.canvas.offsetTop );
      this.isDrawing = true;
    }, false );
		
  }

  mouseOut() {
    this.canvas.addEventListener( 'mouseleave', () => {
      this.isDrawing = false;
      this.draw();
    }, false );
  }

  draw() {
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        
		let dx, 
				dy, 
				sqrDist,
				scale = 1;
 		
 		this.particles.forEach(p => {
      dx = p.x - this.mouse.x;
      dy = p.y - this.mouse.y;

      p.drawParticle(this.context)

      // distance from mouse to particle
      sqrDist =  Math.sqrt( dx * dx + dy * dy );
      ( this.isDrawing ) ? scale = Math.max( Math.min( 5 - ( sqrDist / 10 ), 10 ), 1 ) : scale = 1;
      p.radius = 1 * scale;
    });

  }

  render() {
    this.draw();
    requestAnimationFrame(this.updateRender);
  }

}