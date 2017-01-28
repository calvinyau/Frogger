import MovingObject from "./moving_object";

class Log extends MovingObject {
  constructor(attributes) {
    super(attributes);
    this.logImage = new Image();
    this.logImage.src = attributes.src;
  }

  draw(context) {
    context.drawImage(this.logImage, 13, 82, 274, 59, this.pos.x, this.pos.y, this.width, this.height);
  }

  // out_of_bounds() {
  //   if (this.direction) {
  //     return this.pos.x >= this.canvasWidth;
  //   } else {
  //     return this.pos.x + this.width <= 0;
  //   }
  // }
}

export default Log;
