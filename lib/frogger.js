// import Car from './car';
import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('froggerCanvas');
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  gameView.startAnimation();
});
