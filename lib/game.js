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
    this.died = false;
    this.score = 0;
    this.winPads = [false, false, false, false, false];

    this.deadImage = new Image();
    this.deadImage.src = '../assets/logs_cars_death.png';

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    // document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

    // this.addCars();
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addCars() {
    // direction 0 = left
    // direction 1 = right
    this.cars.push(this.createCar(1, 0, 80));
    this.cars.push(this.createCar(1, 0, 240));
    this.cars.push(this.createCar(1, 0, 420));
    this.cars.push(this.createCar(2, 1, 350));
    this.cars.push(this.createCar(2, 1, 250));
    this.cars.push(this.createCar(2, 1, 80));
    this.cars.push(this.createCar(3, 1, 320));
    this.cars.push(this.createCar(3, 1, 200));
    this.cars.push(this.createCar(3, 1, 70));
    this.cars.push(this.createCar(4, 0, 300));
    this.cars.push(this.createCar(4, 0, 25));
    this.cars.push(this.createCar(5, 1, 120));
    this.cars.push(this.createCar(5, 1, 290));
    this.cars.push(this.createCar(5, 1, 10));
    this.cars.push(this.createCar(6, 1, 80));
    this.cars.push(this.createCar(7, 0, 150));
    this.cars.push(this.createCar(7, 0, 20));
    this.cars.push(this.createCar(8, 0, 220));
    this.cars.push(this.createCar(8, 0, 400));
    this.cars.push(this.createCar(9, 1, 40));
    this.cars.push(this.createCar(10, 1, 90));
    this.cars.push(this.createCar(10, 1, 270));
    this.cars.push(this.createCar(11, 0, 300));
    this.cars.push(this.createCar(11, 0, 40));
  }

  createCar(lane, direction, x) {
    let startY = 517;
    let velX = direction === 0 ? -1 : 1;
    let attributes = {pos: {x: x, y: startY - lane * this.frogVStep},
          vel: velX, width: 45, height: 30, canvasWidth: this.canvas.width,
          src: '../assets/logs_cars_death.png', direction: direction, lane: lane };
    return new Car(attributes);
  }

  up() {
    if (this.frogY >= 0 + this.frogHeight) {
      if (this.frogY > 55 || (
        (this.frogX >= 50 && this.frogX < 78) || (this.frogX >= 135 && this.frogX < 163) ||
        (this.frogX >= 220 && this.frogX < 248) || (this.frogX >= 305 && this.frogX < 333) ||
        (this.frogX >= 390 && this.frogX < 418) )) {

        this.frogY -= this.frogVStep;

      }
    }
  }

  right() {
    if (this.frogX <= (this.canvas.width - this.frogWidth - this.frogHStep)) {
      if (this.frogY > 35) {
        this.frogX += this.frogHStep;
      }
    }
  }

  left() {
    if (this.frogX >= 0 + this.frogWidth) {
      if (this.frogY > 35) {
        this.frogX -= this.frogHStep;
      }
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
        break;
      case 38:
        this.up();
        break;
      case 39:
        this.right();
        break;
      case 40:
        this.down();
        break;
    }
  }

  checkFrogCollision() {
    for (let i = 0; i < this.cars.length; i++) {
      let carX = this.cars[i].pos.x;
      let carY = this.cars[i].pos.y;
      let carWidth = this.cars[i].width;
      let carHeight = this.cars[i].height;

      if ((this.frogX < carX && this.frogX + this.frogWidth > carX) ||
      (this.frogX > carX && this.frogX < carX + carWidth)) {
        if ((this.frogY < carY && this.frogY + this.frogHeight > carY) ||
        (this.frogY > carY && this.frogY < carY + carHeight)) {
          // let dead = new Image();
          // dead.src = '../assets/logs_cars_death.png';
          this.ctx.drawImage(this.deadImage, 300, 85, 70, 55, this.frogX, this.frogY, 25, 25);
          // document.location.reload();
          this.lives -= 1;
          this.died = true;
          console.log("lost a life");
          if (this.lives <= 0) {
            this.gameOver = true;
            alert("Game over!");
          } else {
            setTimeout(() => {
              this.died = false;
              this.resetGame();
            }, 1000);
          }
        }
      }
    }
  }

  checkScored() {
    if (this.frogY < 42) {
      for (let a = 0; a < 5; a++) {
        this.checkPad(a, 50 + 85 * a, 78 + 85 * a)
      }
    }
  }

  checkPad(num, start, end) {
    if (!this.winPads[num] && this.frogX >= start && this.frogX <= end) {
      this.winPads[num] = true;
      this.score += 100;
    }
  }

  drawFrog(ctx) {
    let frog = new Image();
    frog.src = '../assets/frog/frog_initial.png';
    // frog.onload = function() {
    //   ctx.drawImage(frog, 20, 20, 50, 50);
    // };
    this.ctx.drawImage(frog, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
  }

  drawCars(ctx) {
    for (let a = 0; a < this.cars.length; a++) {
      if (this.cars[a].out_of_bounds()) {
        let startX = this.cars[a].direction ? -24 : this.canvas.width - 1;
        let newCar = this.createCar(this.cars[a].lane, this.cars[a].direction, startX);
        this.cars[a] = newCar;
      }
      this.cars[a].draw(ctx);
      this.cars[a].move();
    }
  }

  drawScore(ctx) {
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: "+ this.score, 5, 15);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrog(ctx);
    this.drawCars(ctx);
    this.checkFrogCollision();
    this.checkScored();
    this.drawScore(ctx);
  }

  resetGame() {
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
