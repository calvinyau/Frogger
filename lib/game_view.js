class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  startAnimation() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.ctx);
    if (!this.game.gameOver) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
