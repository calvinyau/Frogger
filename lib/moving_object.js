class MovingObject {
  constructor(attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.width = attributes.width;
    this.height = attributes.height;
    this.canvasWidth = attributes.canvasWidth;
  }

  move() {
    if (this.vel.x < 0 && this.pos.x + this.width > 0) {
      this.pos.x += this.vel.x;
    }
    if (this.vel.x > 0 && this.pos.x < this.canvasWidth) {
      this.pos.x += this.vel.x;
    }
  }

}

export default MovingObject;
