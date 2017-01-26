import Car from "./car";

class Game {
  constructor() {
    this.canvas = document.getElementById('froggerCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.cars = [];

    this.frogVStep = 42;
    this.frogHStep = 28;
    this.frogWidth = 25;
    this.frogHeight = 25;
    this.initialFrogX = this.canvas.width/2 - 2;
    this.initialFrogY = this.canvas.height - 35;
    this.frogX = this.initialFrogX;
    this.frogY = this.initialFrogY;

    this.lives = 3;
    this.gameOver = false;
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    // document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    this.addCars();
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addCars() {
    let attributes1 = {pos: {x: 400, y: 475}, vel: {x: -2, y: 0}, width: 45, height: 30, canvasWidth: this.canvas.width};
    const car1 = new Car(attributes1);
    // let attributes2 = {pos: {x: 300, y: 475}, vel: {x: -4, y: 0}, width: 45, height: 30, canvasWidth: this.canvas.width};
    // const car2 = new Car(attributes2);
    this.cars.push(car1);
    // this.cars.push(car2);
    let attributes = {};
    let lane, leftOrRight, initialX, velX;
    setInterval(() => {
      lane = this.getRandomIntInclusive(1, 11);
      leftOrRight = this.getRandomIntInclusive(0, 1);
      initialX = leftOrRight ? -50 : 450;
      velX = leftOrRight ? 2 : -2;
      attributes = {pos: {x: initialX, y: this.initialFrogY - lane * this.frogVStep},
        vel: {x: velX, y: 0}, width: 45, height: 30, canvasWidth: this.canvas.width };
      if (this.cars.length === 40) {
        this.cars = this.cars.slice(21, 41); // take 2nd half
      }
      this.cars.push(new Car(attributes));
      // debugger;
    }, 10050);
  }

  drawFrog(ctx) {
    let frog = new Image();
    frog.src = '../assets/frog/frog_initial.png';
    // frog.onload = function() {
    //   ctx.drawImage(frog, 20, 20, 50, 50);
    // };
    this.ctx.drawImage(frog, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
  }

  up() {
    if (this.frogY >= 0 + this.frogHeight) {
      this.frogY -= this.frogVStep;
    }
  }

  right() {
    if (this.frogX <= (this.canvas.width - this.frogWidth - this.frogHStep)) {
        this.frogX += this.frogHStep;
    }
  }

  left() {
    if (this.frogX >= 0 + this.frogWidth) {
      this.frogX -= this.frogHStep;
    }
  }

  down() {
    if (this.frogY <= this.canvas.height - this.frogHeight - this.frogVStep) {
      this.frogY += this.frogVStep;
    }
  }

  keyDownHandler(e) {
    switch(e.keyCode) {
      case 37:
        this.left();
          // this.leftPressed = true;
        break;
      case 38:
        this.up();
        // this.upPressed = true;
        break;
      case 39:
        this.right();
        // this.rightPressed = true;
        break;
      case 40:
        this.down();
        // this.downPressed = true;
        break;
    }
  }

  // keyUpHandler(e) {
  //   switch(e.keyCode) {
  //     case 37:
  //       this.leftPressed = false;
  //       break;
  //     case 38:
  //       this.upPressed = false;
  //       break;
  //     case 39:
  //       this.rightPressed = false;
  //       break;
  //     case 40:
  //       this.downPressed = false;
  //       break;
  //   }
  // }

  checkFrogCollision() {
    for (let i = 0; i < this.cars.length; i++) {
      let carX = this.cars[i].pos.x;
      let carY = this.cars[i].pos.y;
      let carWidth = this.cars[i].width;
      let carHeight = this.cars[i].height;

      console.log("checking collision");

      if ((this.frogX < carX && this.frogX + this.frogWidth > carX) ||
            (this.frogX > carX && this.frogX < carX + carWidth)) {
        if ((this.frogY < carY && this.frogY + this.frogHeight > carY) ||
            (this.frogY > carY && this.frogY < carY + carHeight)) {
          alert("Game over!");
          console.log("GAME OVER");
          let dead = new Image();
          let context = this.ctx;
          dead.src = '../assets/logs_cars_death.png';
          this.ctx.drawImage(dead, 300, 85, 70, 55, this.frogX, this.frogY, 25, 25);
          // document.location.reload();
          this.lives -= 1;
          this.gameOver = this.lives <= 0 ? true : false;
          this.restartGame();
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrog(ctx);
    for (let a = 0; a < this.cars.length; a++) {
      this.cars[a].draw(ctx);
      console.log("draw");
    }
    // this.cars[0].draw(ctx);
    // this.cars[1].draw(ctx);
    this.checkFrogCollision();
    for (let b = 0; b < this.cars.length; b++) {
      this.cars[b].move();
    }
  }

  restartGame() {
    this.resetFrog();
    this.cars = [];
    this.addCars();
  }

  resetFrog() {
    this.frogX = this.initialFrogX;
    this.frogY = this.initialFrogY;
  }


}

export default Game;
