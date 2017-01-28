/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _game_view = __webpack_require__(4);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Car from './car';
	document.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById('froggerCanvas');
	  var ctx = canvas.getContext("2d");
	  var game = new _game2.default();
	  var gameView = new _game_view2.default(game, ctx);
	  gameView.startAnimation();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _car = __webpack_require__(2);
	
	var _car2 = _interopRequireDefault(_car);
	
	var _log = __webpack_require__(5);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.canvas = document.getElementById('froggerCanvas');
	    this.ctx = this.canvas.getContext("2d");
	    this.cars = [];
	    this.logs = [];
	
	    this.frogVStep = 42;
	    this.frogHStep = 28;
	    this.frogWidth = 25;
	    this.frogHeight = 25;
	    this.initialFrogX = this.canvas.width / 2 - 2;
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
	    this.frog.src = "http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501353/Frogger/frog_sprites.png";
	    this.deadImage = new Image();
	    this.deadImage.src = 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png';
	    this.heartImage = new Image();
	    this.heartImage.src = 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/heart.png';
	
	    this.paused = true;
	
	    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	
	    this.addCars();
	    this.addLogs();
	  }
	
	  _createClass(Game, [{
	    key: "addCars",
	    value: function addCars() {
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
	    }
	  }, {
	    key: "createCar",
	    value: function createCar(lane, direction, x) {
	      var startY = 517;
	      var velX = direction === 0 ? -1 * this.level : 1 * this.level;
	      var attributes = { pos: { x: x, y: startY - lane * this.frogVStep },
	        vel: velX, width: 45, height: 30, canvasWidth: this.canvas.width,
	        src: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png',
	        src_reversed: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501353/Frogger/car_left.png',
	        direction: direction, lane: lane };
	      return new _car2.default(attributes);
	    }
	  }, {
	    key: "addLogs",
	    value: function addLogs() {
	      this.logs.push(this.createLog(7, 0, 150));
	      this.logs.push(this.createLog(7, 0, 20));
	      this.logs.push(this.createLog(8, 1, 220));
	      this.logs.push(this.createLog(8, 1, 400));
	      this.logs.push(this.createLog(9, 0, 40));
	      this.logs.push(this.createLog(9, 0, 340));
	      this.logs.push(this.createLog(10, 1, 90));
	      this.logs.push(this.createLog(10, 1, 270));
	      this.logs.push(this.createLog(11, 0, 300));
	      this.logs.push(this.createLog(11, 0, 40));
	    }
	  }, {
	    key: "createLog",
	    value: function createLog(lane, direction, x) {
	      var startY = 517;
	      var velX = direction === 0 ? -1 * this.level : 1 * this.level;
	      var attributes = { pos: { x: x, y: startY - lane * this.frogVStep },
	        vel: velX, width: 60, height: 20, canvasWidth: this.canvas.width,
	        src: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png',
	        direction: direction, lane: lane };
	      return new _log2.default(attributes);
	    }
	  }, {
	    key: "up",
	    value: function up() {
	      if (this.frogY >= 0 + this.frogHeight) {
	        if (this.frogY > 55 || this.frogX >= 50 && this.frogX < 78 || this.frogX >= 135 && this.frogX < 163 || this.frogX >= 220 && this.frogX < 248 || this.frogX >= 305 && this.frogX < 333 || this.frogX >= 390 && this.frogX < 418) {
	
	          this.frogY -= this.frogVStep;
	          this.frogDirection = "up";
	        }
	      }
	    }
	  }, {
	    key: "right",
	    value: function right() {
	      if (this.frogX <= this.canvas.width - this.frogWidth - this.frogHStep) {
	        if (this.frogY > 35) {
	          this.frogX += this.frogHStep;
	          this.frogDirection = "right";
	        }
	      }
	    }
	  }, {
	    key: "left",
	    value: function left() {
	      if (this.frogX >= 0 + this.frogWidth) {
	        if (this.frogY > 35) {
	          this.frogX -= this.frogHStep;
	          this.frogDirection = "left";
	        }
	      }
	    }
	  }, {
	    key: "down",
	    value: function down() {
	      if (this.frogY <= this.canvas.height - this.frogHeight - this.frogVStep) {
	        this.frogY += this.frogVStep;
	        this.frogDirection = "down";
	      }
	    }
	  }, {
	    key: "toggleStartPause",
	    value: function toggleStartPause() {
	      if (this.paused) {
	        $('.start-pause-screen').css('visibility', 'hidden');
	        $('#show-score').css('visibility', 'hidden');
	      } else {
	        $('.start-pause-screen').css('visibility', 'visible');
	        $('#title').text("Paused");
	        $('#show-score').css('visibility', 'hidden');
	      }
	      if (this.gameOver) {
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
	      this.paused = !this.paused;
	    }
	  }, {
	    key: "keyDownHandler",
	    value: function keyDownHandler(e) {
	      switch (e.keyCode) {
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
	  }, {
	    key: "checkFrogCollision",
	    value: function checkFrogCollision() {
	      if (this.frogY > 253) {
	        if (this.carCollision()) {
	          this.handleDeath();
	        }
	      } else if (this.frogY > 40) {
	        if (!this.logCollision()) {
	          this.handleDeath();
	        }
	      }
	    }
	  }, {
	    key: "handleDeath",
	    value: function handleDeath() {
	      var _this = this;
	
	      this.ctx.drawImage(this.deadImage, 300, 85, 70, 55, this.frogX, this.frogY, 25, 25);
	      this.lives -= 1;
	      this.died = true;
	      if (this.lives <= 0) {
	        setTimeout(function () {
	          _this.gameOver = true;
	          _this.endGame();
	        }, 1000);
	      } else {
	        setTimeout(function () {
	          _this.died = false;
	          _this.resetRound();
	        }, 1000);
	      }
	    }
	  }, {
	    key: "carCollision",
	    value: function carCollision() {
	      for (var i = 0; i < this.cars.length; i++) {
	        var carX = this.cars[i].pos.x;
	        var carY = this.cars[i].pos.y;
	        var carWidth = this.cars[i].width;
	        var carHeight = this.cars[i].height;
	
	        if (this.frogX < carX && this.frogX + this.frogWidth > carX || this.frogX > carX && this.frogX < carX + carWidth) {
	          if (this.frogY < carY && this.frogY + this.frogHeight > carY || this.frogY > carY && this.frogY < carY + carHeight) {
	            return true;
	          }
	        }
	      }
	      return false;
	    }
	  }, {
	    key: "logCollision",
	    value: function logCollision() {
	      for (var i = 0; i < this.logs.length; i++) {
	        var logX = this.logs[i].pos.x;
	        var logY = this.logs[i].pos.y;
	        var logWidth = this.logs[i].width;
	        var logHeight = this.logs[i].height;
	
	        if (this.frogX < logX && this.frogX + this.frogWidth > logX || this.frogX > logX && this.frogX < logX + logWidth) {
	          if (this.frogY < logY && this.frogY + this.frogHeight > logY || this.frogY > logY && this.frogY < logY + logHeight) {
	            return this.logs[i];
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: "checkScored",
	    value: function checkScored() {
	      var scored = false;
	      if (this.frogY < 42) {
	        for (var a = 0; a < 5; a++) {
	          scored = scored || this.checkPad(a, 50 + 85 * a, 78 + 85 * a);
	        }
	      }
	      return scored;
	    }
	  }, {
	    key: "checkPad",
	    value: function checkPad(num, start, end) {
	      if (!this.scorePads[num] && this.frogX >= start && this.frogX <= end) {
	        this.scorePads[num] = true;
	        this.score += 100 * this.level;
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "drawFrog",
	    value: function drawFrog(ctx) {
	      var log = this.logCollision();
	      if (log) {
	        this.frogX += log.vel;
	      }
	
	      switch (this.frogDirection) {
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
	      this.drawPadFrogs();
	    }
	  }, {
	    key: "drawPadFrogs",
	    value: function drawPadFrogs() {
	      for (var a = 0; a < 5; a++) {
	        if (this.scorePads[a]) {
	          this.ctx.drawImage(this.frog, 55, 160, 40, 32, 50 + 85 * a, 12, this.frogWidth, this.frogHeight);
	        }
	      }
	    }
	  }, {
	    key: "drawCars",
	    value: function drawCars(ctx) {
	      for (var a = 0; a < this.cars.length; a++) {
	        if (this.cars[a].out_of_bounds()) {
	          var startX = this.cars[a].direction ? -24 : this.canvas.width - 1;
	          var newCar = this.createCar(this.cars[a].lane, this.cars[a].direction, startX);
	          this.cars[a] = newCar;
	        }
	        this.cars[a].draw(ctx);
	        if (!this.paused) {
	          this.cars[a].move();
	        }
	      }
	    }
	  }, {
	    key: "drawLogs",
	    value: function drawLogs(ctx) {
	      for (var a = 0; a < this.logs.length; a++) {
	        if (this.logs[a].out_of_bounds()) {
	          var startX = this.logs[a].direction ? -59 : this.canvas.width - 1;
	          var newLog = this.createLog(this.logs[a].lane, this.logs[a].direction, startX);
	          this.logs[a] = newLog;
	        }
	        this.logs[a].draw(ctx);
	        if (!this.paused) {
	          this.logs[a].move();
	        }
	      }
	    }
	  }, {
	    key: "drawScoreAndLevel",
	    value: function drawScoreAndLevel(ctx) {
	      ctx.font = "12px 'Press Start 2P'";
	      ctx.fillStyle = "#000";
	      ctx.fillText("Score: " + this.score, this.canvas.width - 150, this.canvas.height - 25);
	      ctx.fillText("Level: " + this.level, this.canvas.width - 150, this.canvas.height - 10);
	    }
	  }, {
	    key: "drawLives",
	    value: function drawLives(ctx) {
	      for (var a = 0; a < this.lives; a++) {
	        this.ctx.drawImage(this.heartImage, 5 + 20 * a, this.canvas.height - 25, 20, 20);
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.drawCars(ctx);
	      this.drawLogs(ctx);
	      this.drawFrog(ctx);
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
	  }, {
	    key: "clearPads",
	    value: function clearPads() {
	      for (var a = 0; a < 5; a++) {
	        this.scorePads[a] = false;
	      }
	    }
	  }, {
	    key: "resetRound",
	    value: function resetRound() {
	      this.resetFrog();
	      this.cars = [];
	      this.addCars();
	    }
	  }, {
	    key: "resetFrog",
	    value: function resetFrog() {
	      this.frogX = this.initialFrogX;
	      this.frogY = this.initialFrogY;
	      this.frogDirection = "up";
	    }
	  }, {
	    key: "endGame",
	    value: function endGame() {
	      this.paused = true;
	      $('.start-pause-screen').css('visibility', 'visible');
	      $('#show-score').css('visibility', 'visible');
	      $('#show-score').text("Score: " + String(this.score));
	      $('#title').text("Game Over");
	    }
	  }, {
	    key: "restartGame",
	    value: function restartGame() {
	      this.paused = false;
	      $('.start-pause-screen').css('visibility', 'hidden');
	      $('#show-score').css('visibility', 'hidden');
	
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
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Car = function (_MovingObject) {
	  _inherits(Car, _MovingObject);
	
	  function Car(attributes) {
	    _classCallCheck(this, Car);
	
	    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, attributes));
	
	    _this.carImage = new Image();
	    _this.revCarImage = new Image();
	    _this.carImage.src = attributes.src;
	    _this.revCarImage.src = attributes.src_reversed;
	    return _this;
	  }
	
	  _createClass(Car, [{
	    key: "draw",
	    value: function draw(context) {
	      if (this.direction) {
	        context.drawImage(this.carImage, 15, 245, 130, 70, this.pos.x, this.pos.y, this.width, this.height);
	      } else {
	        context.drawImage(this.revCarImage, this.pos.x, this.pos.y, this.width, this.height);
	      }
	    }
	
	    // out_of_bounds() {
	    //   if (this.direction) {
	    //     return this.pos.x >= this.canvasWidth;
	    //   } else {
	    //     return this.pos.x + this.width <= 0;
	    //   }
	    // }
	
	  }]);
	
	  return Car;
	}(_moving_object2.default);
	
	exports.default = Car;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(attributes) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = attributes.pos;
	    this.vel = attributes.vel;
	    this.width = attributes.width;
	    this.height = attributes.height;
	    this.canvasWidth = attributes.canvasWidth;
	    this.direction = attributes.direction;
	    this.lane = attributes.lane;
	  }
	
	  _createClass(MovingObject, [{
	    key: "move",
	    value: function move() {
	      if (this.vel < 0 && this.pos.x + this.width > 0) {
	        this.pos.x += this.vel;
	      }
	      if (this.vel > 0 && this.pos.x < this.canvasWidth) {
	        this.pos.x += this.vel;
	      }
	    }
	  }, {
	    key: "out_of_bounds",
	    value: function out_of_bounds() {
	      if (this.direction) {
	        return this.pos.x >= this.canvasWidth;
	      } else {
	        return this.pos.x + this.width <= 0;
	      }
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.game = game;
	    this.ctx = ctx;
	  }
	
	  _createClass(GameView, [{
	    key: "startAnimation",
	    value: function startAnimation() {
	      var _this = this;
	
	      var intervalId = setInterval(function () {
	        if (!_this.game.died && !_this.gameOver) {
	          _this.game.draw(_this.ctx);
	        }
	      }, 40);
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Log = function (_MovingObject) {
	  _inherits(Log, _MovingObject);
	
	  function Log(attributes) {
	    _classCallCheck(this, Log);
	
	    var _this = _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, attributes));
	
	    _this.logImage = new Image();
	    _this.logImage.src = attributes.src;
	    return _this;
	  }
	
	  _createClass(Log, [{
	    key: "draw",
	    value: function draw(context) {
	      context.drawImage(this.logImage, 13, 82, 274, 59, this.pos.x, this.pos.y, this.width, this.height);
	    }
	
	    // out_of_bounds() {
	    //   if (this.direction) {
	    //     return this.pos.x >= this.canvasWidth;
	    //   } else {
	    //     return this.pos.x + this.width <= 0;
	    //   }
	    // }
	
	  }]);
	
	  return Log;
	}(_moving_object2.default);
	
	exports.default = Log;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map