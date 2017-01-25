import MovingObject from "./moving_object";

class Car extends MovingObject {
  constructor(attributes) {
    super(attributes);
  }

  draw(context) {
    console.log("drawing");
    let car = new Image();
    car.src = '../assets/logs_cars_death.png';
    context.drawImage(car, 15, 245, 130, 70, this.pos[0], this.pos[1], this.width, this.height);
  }
}

export default Car;
