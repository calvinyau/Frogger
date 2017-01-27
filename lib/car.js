import MovingObject from "./moving_object";

class Car extends MovingObject {
  constructor(attributes) {
    super(attributes);
    this.carImage = new Image();
    this.revCarImage = new Image();
    this.carImage.src = attributes.src;
    this.revCarImage.src = attributes.src_reversed;
  }

  draw(context) {
    if (this.direction) {
      context.drawImage(this.carImage, 15, 245, 130, 70, this.pos.x, this.pos.y, this.width, this.height);
    } else {
      context.drawImage(this.revCarImage, this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  out_of_bounds() {
    if (this.direction) {
      return this.pos.x >= this.canvasWidth;
    } else {
      return this.pos.x + this.width <= 0;
    }
  }
}

export default Car;
