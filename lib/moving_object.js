class MovingObject {
  constructor(attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.width = attributes.width;
    this.height = attributes.height;
  }

  move() {
    this.pos.x += this.vel.x;
  }

}

export default MovingObject;
