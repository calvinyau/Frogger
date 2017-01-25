import Car from './car';

$(() => {
  const canvas = document.getElementById('froggerCanvas');
  const ctx = canvas.getContext("2d");

  let frogVStep = 42;
  let frogHStep = 28;
  let frogWidth = 25;
  let frogHeight = 25;
  let frogX = canvas.width/2 - 2;
  let frogY = canvas.height - 35;
  let rightPressed = false;
  let leftPressed = false;
  let upPressed = false;
  let downPressed = false;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);


  function draw() {
    let attributes = {pos: [400, 480], vel: 2, width: 40, height: 30};
    const car1 = new Car(attributes);


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrog();
    console.log(car1);
    car1.draw(ctx);

    if (rightPressed && frogX <= (canvas.width - frogWidth - frogHStep)) {
      frogX += frogHStep;
      // console.log(frogX);
    }
    else if (leftPressed && frogX >= 0 + frogWidth) {
      frogX -= frogHStep;
      // console.log(frogX);
    }
    else if (upPressed && frogY >= 0 + frogHeight) {
      frogY -= frogVStep;
      // console.log(frogY);
    }
    else if (downPressed && frogY <= canvas.height - frogHeight - frogVStep) {
      frogY += frogVStep;
      // console.log(frogY);
    }
  }

  function drawFrog() {
    let frog = new Image();
    frog.src = '../assets/frog/frog_initial.png';
    frog.onload = function() {
      ctx.drawImage(frog, frogX, frogY, frogWidth, frogHeight);
    };
  }

  function keyDownHandler(e) {
    switch(e.keyCode) {
      case 37:
        leftPressed = true;
        break;
      case 38:
        upPressed = true;
        break;
      case 39:
        rightPressed = true;
        break;
      case 40:
        downPressed = true;
        break;
    }
  }

  function keyUpHandler(e) {
    switch(e.keyCode) {
      case 37:
        leftPressed = false;
        break;
      case 38:
        upPressed = false;
        break;
      case 39:
        rightPressed = false;
        break;
      case 40:
        downPressed = false;
        break;
    }
  }

  setInterval(draw, 100);

});
