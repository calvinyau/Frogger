// import Car from './car';
import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('froggerCanvas');
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  gameView.startAnimation();

  // let frogVStep = 42;
  // let frogHStep = 28;
  // let frogWidth = 25;
  // let frogHeight = 25;
  // let frogX = canvas.width/2 - 2;
  // let frogY = canvas.height - 35;
  // let rightPressed = false;
  // let leftPressed = false;
  // let upPressed = false;
  // let downPressed = false;
  //
  // document.addEventListener("keydown", keyDownHandler, false);
  // document.addEventListener("keyup", keyUpHandler, false);
  //
  // let attributes = {pos: {x: 400, y: 475}, vel: {x: -2, y: 0}, width: 45, height: 30};
  // const car1 = new Car(attributes);
  //
  //
  // function draw() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   drawFrog();
  //   car1.draw(ctx);
  //
  //   car1.move();
  //
  //   if (rightPressed && frogX <= (canvas.width - frogWidth - frogHStep)) {
  //     frogX += frogHStep;
  //     // console.log(frogX);
  //   }
  //   else if (leftPressed && frogX >= 0 + frogWidth) {
  //     frogX -= frogHStep;
  //     // console.log(frogX);
  //   }
  //   else if (upPressed && frogY >= 0 + frogHeight) {
  //     frogY -= frogVStep;
  //     // console.log(frogY);
  //   }
  //   else if (downPressed && frogY <= canvas.height - frogHeight - frogVStep) {
  //     frogY += frogVStep;
  //     // console.log(frogY);
  //   }
  // }
  //
  // function drawFrog() {
  //   let frog = new Image();
  //   frog.src = '../assets/frog/frog_initial.png';
  //   frog.onload = function() {
  //     ctx.drawImage(frog, frogX, frogY, frogWidth, frogHeight);
  //   };
  // }
  //
  // function keyDownHandler(e) {
  //   switch(e.keyCode) {
  //     case 37:
  //       leftPressed = true;
  //       break;
  //     case 38:
  //       upPressed = true;
  //       break;
  //     case 39:
  //       rightPressed = true;
  //       break;
  //     case 40:
  //       downPressed = true;
  //       break;
  //   }
  // }
  //
  // function keyUpHandler(e) {
  //   switch(e.keyCode) {
  //     case 37:
  //       leftPressed = false;
  //       break;
  //     case 38:
  //       upPressed = false;
  //       break;
  //     case 39:
  //       rightPressed = false;
  //       break;
  //     case 40:
  //       downPressed = false;
  //       break;
  //   }
  // }

  // setInterval(draw, 100);

});
