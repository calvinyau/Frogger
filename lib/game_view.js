class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  startAnimation() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (!this.game.died) {
      this.game.draw(this.ctx);
    }
    if (!this.game.gameOver) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
