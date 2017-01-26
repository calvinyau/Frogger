class MovingObject {
  constructor(attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.width = attributes.width;
    this.height = attributes.height;
    this.canvasWidth = attributes.canvasWidth;
    this.direction = attributes.direction;
    this.lane = attributes.lane;
  }

  move() {
    if (this.vel < 0 && this.pos.x + this.width > 0) {
      this.pos.x += this.vel;
    }
    if (this.vel > 0 && this.pos.x < this.canvasWidth) {
      this.pos.x += this.vel;
    }
  }

}

export default MovingObject;
