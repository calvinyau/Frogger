class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  startAnimation() {
    let intervalId = setInterval(() => {
      if (!this.game.died) {
        this.game.draw(this.ctx);
      }
      if (this.game.gameOver) {
        this.game.restartGame();
      }
    }, 40);
  }
}

export default GameView;
