// TO-DO:
// random golden fish to collect
// stats-panel
// life counting
// timer
// restart
// reset
// starter screen with instructions
// winner screen

var allEnemies = [];
var allKids = [];
var allFish = [];
var fishCounter = 0;

// Enemies our player must avoid
var Enemy = function(length, file, speed, min, max, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.direction = direction === 'right' ? -1 : 1;
    this.x = direction === 'right' ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
    this.y = Math.floor(Math.random() * (max - min + 1) + min);
    this.length = length;
    this.speed = speed;
    this.min = min;
    this.max = max;
    this.sprite = file;
    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + (-1 * this.direction) * this.speed * dt);
    if (this.direction === -1 && this.x > 7 || this.direction === 1 && this.x < -2) {
        this.x = this.direction === -1 ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 12) + 9);
        this.y = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
    if ((this.direction === -1 && this.x + this.length - 0.4 >= player.x && this.x < player.x && player.y === this.y) || 
        (this.direction === 1 && this.x <= player.x + 1 - 0.4 && this.x + this.length - 0.4 > player.x && player.y === this.y)) {   
        player.x = 3;
        player.y = 1;
        if (player.grab === true) {
            player.fish.x = player.fish.originalX;
            player.fish.y = player.fish.originalY;
            player.fish.grabbed = false;
            player.grab = false;
        }
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.playerImage = 'images/player.png';
    this.x = 3;
    this.y = 1;
    this.grab = false;
    this.fish = false;
}

Player.prototype.update = function() {  
   
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.x * 101, this.y * 83 - 30);
}

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y - 1 > 0) {
        this.y--;
        if (this.grab === true) {
            this.fish.y--;
        }
    }
    else if (key === 'down' && this.y + 1 <= Math.round(document.querySelector("canvas").height / 115)) {
        this.y++;
        if (this.grab === true) {
            this.fish.y++;
        }
    }
    else if (key === 'left' && this.x - 1 >= 0) {
        this.x--;
        if (this.grab === true) {
            this.fish.x--;
        }
    }
    else if (key === 'right' && this.x + 1 < Math.round(document.querySelector("canvas").width / 100)) {
        this.x++;
        if (this.grab === true) {
            this.fish.x++;
        }
    }
    if (this.grab === false && allFish.find(a => a.x === player.x && a.y === player.y) !== undefined) {
        let grabbedFish = allFish.find(a => a.x === player.x && a.y === player.y);
        this.grab = true;
        grabbedFish.grabbed = true;
        this.fish = grabbedFish;
    }
    if (this.grab === true && this.y === 1) {
        let kidAbove = allKids.find(b => b.x === player.x);
        if (kidAbove.hasFish === false) {
            kidAbove.hasFish = true;
            this.fish.y--;
            this.grab = false;
            this.fish.grabbed = false;
            fishCounter++;
            console.log('fish: ' + fishCounter);
            if (fishCounter === 7) {
                console.log('Congratulation! You won!');
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
for (let i = 0; i < 7; i++) {
    var enemy1 = new Enemy(2, 'images/enemy-seal.png', 2, 3, 6, 'right');
}

var polar = new Enemy(2, 'images/polar.png', 1, 2, 2, 'left');

var player = new Player;

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

// Baby penguins
var Kids = function(position) {
    this.x = position;
    this.y = 0;
    this.imageFile = 'images/baby-penguin.png';
    this.hasFish = false;
    allKids.push(this);
}

for (let i = 0; i < 7; i++) {
    var kid = new Kids(i);
}

Kids.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};


// Fish
var Fish = function(x ,y, number) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.imageFile = 'images/fish.png';
    this.grabbed = false;
    this.number = number;
    allFish.push(this);
}

var fishX = shuffle([0, 1, 2, 3, 4, 5, 6]); 

for (let i = 0; i < 7; i++) {
    var fish = new Fish(fishX[i], Math.floor(Math.random() * (6 - 3 + 1) + 3), i);
}

Fish.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};

// shuffle function to randomize order of characters/toys
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
