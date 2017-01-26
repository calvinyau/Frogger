import MovingObject from "./moving_object";

class Car extends MovingObject {
  constructor(attributes) {
    super(attributes);
    this.carImage = new Image();
    this.carImage.src = attributes.src;
  }

  draw(context) {
    // let car = new Image();
    // car.src = '../assets/logs_cars_death.png';
    // context.drawImage(car, 15, 245, 130, 70, this.pos.x, this.pos.y, this.width, this.height);
    context.drawImage(this.carImage, 15, 245, 130, 70, this.pos.x, this.pos.y, this.width, this.height);
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
