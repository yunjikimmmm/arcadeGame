// [x] Player can not move off screen
// [x] Vehicles cross the screen
// [x] Vehicle-player collisions happen logically (not too early or too late)
// [x] Vehicle-player collision resets the game
// [x] Something happens when player wins

let game = true;

/* =========== E N E M Y =========== */

var Enemy = function(x, y) {
    this.y = y;
    this.x = x;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65; //65 pixels
    this.width = 95;
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > ctx.canvas.width + this.width) {
      this.x = -200 * Math.floor(Math.random() * 4) + 1;// reset the bug once it goes off of the canvas
    } else {
      this.x += 250 *dt; // multiplying by dt normalizes the animation
    }

    // program so that the enemy detects whether there's a collision or not
    // collision(px, py, pw, ph, ex, ey, ew, eh) {
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {

      this.collision = true;

      // resets the player position if there's a collision
      if (player) {
        player.x = 202;
        player.y = 400;
      } else {
        this.collision = false;
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* =========== P L A Y E R =========== */

let Player = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.height = 75;
  this.width = 65;
}

Player.prototype.update = function(dt) {
  if (game && player.y < 40) { // the player has made it to the water
    game = false;
    winGame();
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    const horizontalLimit = 101;
    const verticalLimit = 83;

    if (direction === 'left' && this.x - horizontalLimit >= 0) {
      this.x -= horizontalLimit;
    } else if (direction === 'right' && this.x + horizontalLimit < ctx.canvas.width) {
      this.x += horizontalLimit;
    } else if (direction === 'down' && this.y + verticalLimit < ctx.canvas.height - 200) {
      this.y += verticalLimit;
    } else if (direction === "up" && this.y - verticalLimit > 0 - player.height) {
      this.y -= verticalLimit;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// *********************************************
// Feature: Change Character on Click

const characterClick = document.querySelector('.selectCharacter');
const changePrincess = document.querySelector('.princessCharacter');
const changePinkGirl = document.querySelector('.pinkGirlCharacter');
const changeCatGirl = document.querySelector('.catGirlCharacter');
const changeBoy = document.querySelector('.boyCharacter');
const changeHornGirl = document.querySelector('.hornGirlCharacter');

changePrincess.addEventListeenr('click', function() {
  console.log("Character Change: Princess");
  player.sprite = 'images/char-princess-girl.png';
});

changePinkGirl.addEventListener('click', function() {
  console.log("Character Change: Pink Girl");
  player.sprite = 'images/char-pink-girl.png';
});

changeCatGirl.addEventListener('click', function() {
  console.log("Character Change: Cat Girl! Meow!");
  player.sprite = 'images/char-cat-girl.png';
})

changeBoy.addEventListener('click', function() {
  console.log("Character Change: Boy");
  player.sprite = 'images/char-boy.png';
})

changeHornGirl.addEventListener('click', function() {
  console.log("Character Change: Horn Girl");
  player.sprite = 'images/char-horn-girl.png';
})

// *********************************************

const enemyPosition = [55, 140, 230]; //holds position for the bug
const player = new Player(202, 400, 'images/char-boy.png'); // original character


let allEnemies = enemyPosition.map((y, index) => {
  return new Enemy( (-200 * (index+1)), y); // () set up random number
});

function winGame() {
  reset();
  console.log("You've won!");
}

function reset() {
  allEnemies = [];
}

function collision(px, py, pw, ph, ex, ey, ew, eh) {
  return (Math.abs(px - ex) *2 < pw + ew) &&
          (Math.abs(py - ey) *2 < ph + eh)
}
