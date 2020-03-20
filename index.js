import { Vector } from './vector';
import { Canvas } from './canvas';

const vector = new Vector(100, 100);

function animate() {
  context.beginPath();
  context.arc(vector.x, vector.y, 10, 0, Math.PI * 2, false);
}

const canvasOptions = {
  animate: animate()
}

const canvas = new Canvas(canvasOptions);
canvas.init();