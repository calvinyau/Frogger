class MovingObject {
  constructor(characteristics) {
    this.pos = characteristics.pos;
    this.shape = characteristics.shape;
    this.vel = characteristics.vel;
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }


}

export default MovingObject;
