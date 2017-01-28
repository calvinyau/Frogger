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
    this.frogDirection = "up";

    this.lives = 3;
    this.gameOver = false;
    this.died = false;
    this.score = 0;
    this.scorePads = [false, false, false, false, false];
    this.level = 1;

    this.frog = new Image();
    this.frog.src = "http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485559640/frog_sprites_rmygds.png";
    this.deadImage = new Image();
    this.deadImage.src = 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png';
    this.heartImage = new Image();
    this.heartImage.src = 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/heart.png';

    this.paused = true;

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);

    this.addCars();
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
    this.cars.push(this.createCar(7, 0, 150));
    this.cars.push(this.createCar(7, 0, 20));
    this.cars.push(this.createCar(8, 0, 220));
    this.cars.push(this.createCar(8, 0, 400));
    this.cars.push(this.createCar(9, 1, 40));
    this.cars.push(this.createCar(9, 1, 340));
    this.cars.push(this.createCar(10, 1, 90));
    this.cars.push(this.createCar(10, 1, 270));
    this.cars.push(this.createCar(11, 0, 300));
    this.cars.push(this.createCar(11, 0, 40));
  }

  createCar(lane, direction, x) {
    let startY = 517;
    let velX = direction === 0 ? -1 * this.level : 1 * this.level;
    let attributes = {pos: {x: x, y: startY - lane * this.frogVStep},
          vel: velX, width: 45, height: 30, canvasWidth: this.canvas.width,
          src: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png',
          src_reversed: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501353/Frogger/car_left.png',
          direction: direction, lane: lane };
    return new Car(attributes);
  }

  up() {
    if (this.frogY >= 0 + this.frogHeight) {
      if (this.frogY > 55 || (
        (this.frogX >= 50 && this.frogX < 78) || (this.frogX >= 135 && this.frogX < 163) ||
        (this.frogX >= 220 && this.frogX < 248) || (this.frogX >= 305 && this.frogX < 333) ||
        (this.frogX >= 390 && this.frogX < 418) )) {

        this.frogY -= this.frogVStep;
        this.frogDirection = "up";

      }
    }
  }

  right() {
    if (this.frogX <= (this.canvas.width - this.frogWidth - this.frogHStep)) {
      if (this.frogY > 35) {
        this.frogX += this.frogHStep;
        this.frogDirection = "right";
      }
    }
  }

  left() {
    if (this.frogX >= 0 + this.frogWidth) {
      if (this.frogY > 35) {
        this.frogX -= this.frogHStep;
        this.frogDirection = "left";
      }
    }
  }

  down() {
    if (this.frogY <= this.canvas.height - this.frogHeight - this.frogVStep) {
      this.frogY += this.frogVStep;
      this.frogDirection = "down";
    }
  }

  toggleStartPause() {
    this.paused = !this.paused;
    if ( $('.start-pause-screen').css('visibility') == 'hidden' ) {
      $('.start-pause-screen').css('visibility','visible');
    } else {
      $('.start-pause-screen').css('visibility','hidden');
    }
    if (this.paused && !this.gameOver) {
      $('#title').text("Paused");
    } else {
      $('#title').text("Game Over");
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
      case 32:
        this.toggleStartPause();
        break;
      case 82:
        this.restartGame();
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
          this.ctx.drawImage(this.deadImage, 300, 85, 70, 55, this.frogX, this.frogY, 25, 25);
          this.lives -= 1;
          this.died = true;
          if (this.lives <= 0) {
            setTimeout(() => {
              this.gameOver = true;
              this.toggleStartPause();
            }, 1000);
          } else {
            setTimeout(() => {
              this.died = false;
              this.resetRound();
            }, 1000);
          }
        }
      }
    }
  }

  checkScored() {
    let scored = false;
    if (this.frogY < 42) {
      for (let a = 0; a < 5; a++) {
        scored = scored || this.checkPad(a, 50 + 85 * a, 78 + 85 * a)
      }
    }
    return scored;
  }

  checkPad(num, start, end) {
    if (!this.scorePads[num] && this.frogX >= start && this.frogX <= end) {
      this.scorePads[num] = true;
      this.score += (100 * this.level);
      return true;
    }
    return false;
  }

  drawFrog(ctx) {
    switch(this.frogDirection) {
      case "up":
        this.ctx.drawImage(this.frog, 55, 160, 40, 32, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
        break;
      case "down":
        this.ctx.drawImage(this.frog, 58, 209, 34, 32, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
        break;
      case "right":
        this.ctx.drawImage(this.frog, 58, 120, 35, 26, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
        break;
      case "left":
        this.ctx.drawImage(this.frog, 53, 71, 36, 27, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
        break;
    }
    // this.ctx.drawImage(this.frog, this.frogX, this.frogY, this.frogWidth, this.frogHeight);
    this.drawPadFrogs();

  }

  drawPadFrogs() {
    for (let a = 0; a < 5; a++) {
      if (this.scorePads[a]) {
        this.ctx.drawImage(this.frog, 55, 160, 40, 32, 50 + 85 * a, 12, this.frogWidth, this.frogHeight);
      }
    }
  }

  drawCars(ctx) {
    for (let a = 0; a < this.cars.length; a++) {
      if (this.cars[a].out_of_bounds()) {
        let startX = this.cars[a].direction ? -24 : this.canvas.width - 1;
        let newCar = this.createCar(this.cars[a].lane, this.cars[a].direction, startX);
        this.cars[a] = newCar;
      }
      this.cars[a].draw(ctx);
      if (!this.paused) {
        this.cars[a].move();
      }
    }
  }

  drawScoreAndLevel(ctx) {
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + this.score, this.canvas.width - 150, this.canvas.height - 25);
    ctx.fillText("Level: " + this.level, this.canvas.width - 150, this.canvas.height - 10);
  }

  drawLives(ctx) {
    for (let a = 0; a < this.lives; a++) {
      this.ctx.drawImage(this.heartImage, 5 + 20 * a, this.canvas.height - 25, 20, 20);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawFrog(ctx);
    this.drawCars(ctx);
    this.drawLives(ctx);
    this.checkFrogCollision();
    if (this.checkScored()) {
      if (this.scorePads[0] && this.scorePads[1] && this.scorePads[2] && this.scorePads[3] && this.scorePads[4]) {
        this.level += 1;
        this.clearPads();
        this.resetRound();
      } else {
        this.resetFrog();
      }
    }
    this.drawScoreAndLevel(ctx);
  }

  clearPads() {
    for (let a = 0; a < 5; a++) {
      this.scorePads[a] = false;
    }
  }

  resetRound() {
    this.resetFrog();
    this.cars = [];
    this.addCars();
  }

  resetFrog() {
    this.frogX = this.initialFrogX;
    this.frogY = this.initialFrogY;
  }

  restartGame() {
    if (this.gameOver) {
      this.paused = true;
    } else {
      this.paused = false;
      if ( $('.start-pause-screen').css('visibility') != 'hidden' ) {
        $('.start-pause-screen').css('visibility','hidden');
      } else {
        $('.start-pause-screen').css('visibility','visible');
      }
    }

    // this.paused = this.gameOver? true : false;
    this.resetFrog();
    this.cars = [];
    this.lives = 3;
    this.gameOver = false;
    this.died = false;
    this.score = 0;
    this.scorePads = [false, false, false, false, false];
    this.level = 1;
    this.addCars();
  }

}

export default Game;
