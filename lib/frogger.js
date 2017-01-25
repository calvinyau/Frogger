$(() => {
  const canvas = document.getElementById('froggerCanvas');
  const ctx = canvas.getContext("2d");

  let x = canvas.width/2-25;
  let y = canvas.height - 45;
  let dx = 2;
  let dy = -2;
  let frogRadius = 10;
  let rightPressed = false;
  let leftPressed = false;
  let upPressed = false;
  let downPressed = false;
  let frogX = x;
  let frogY = y;
  let frogStep = 25;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);


  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBall();
    x += dx;
    y += dy;
    drawFrog();

    if (rightPressed && frogX < (canvas.width - frogRadius - frogStep)) {
      frogX += frogStep;
      console.log(frogX);
    }
    else if (leftPressed && frogX > 0 + frogRadius) {
      frogX -= frogStep;
    }
    else if (upPressed && frogY > 0 + frogRadius + frogStep) {
      frogY -= frogStep;
    }
    else if (downPressed && frogY < canvas.height - frogRadius - frogStep) {
      frogY += frogStep;
    }
    console.log(frogX);
  }

  function drawFrog() {
    let frog = new Image();

    frog.onload = function() {
      ctx.drawImage(frog, frogX, frogY);
    };
    frog.src = '../assets/frog/frog_initial.png';
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
