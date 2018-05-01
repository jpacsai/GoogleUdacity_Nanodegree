// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -1;
    this.y = 3;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-car.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + 3 * dt);
    if (this.x > 7) {
        this.x = -1 * (Math.floor(Math.random() * 10) + 3);
        this.y = Math.floor(Math.random() * (5 - 2) + 2);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row, col) {
    this.playerImage = 'images/char-boy.png';
    this.row = 5;
    this.col = 3;
    this.grab = false;
    this.toy = "none";
}

Player.prototype.update = function() {
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.col * 101, this.row * 83 - 30);
}

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.row - 1 > 0) {
        this.row--;
        if (this.grab === true) {
            this.toy.y--;
        }
    }
    else if (key === 'down' && this.row + 1 <= Math.round(document.querySelector("canvas").height / 115)) {
        this.row++;
        if (this.grab === true) {
            this.toy.y++;
        }
    }
    else if (key === 'left' && this.col - 1 >= 0) {
        this.col--;
        if (this.grab === true) {
            this.toy.x--;
        }
    }
    else if (key === 'right' && this.col + 1 < Math.round(document.querySelector("canvas").width / 100)) {
        this.col++;
        if (this.grab === true) {
            this.toy.x++;
        }
    }
    if (this.grab === false && this.row === 6 && allToys.find(a => a.x === player.col && a.y === player.row) !== undefined) {
        let grabbedToy = allToys.find(a => a.x === player.col && a.y === player.row);
        this.grab = true;
        grabbedToy.grabbed = true;
        this.toy = grabbedToy;
    }
    if (this.grab === true && this.row === 1) {
        let kidAbove = allKids.find(b => b.x === player.col);
        if (kidAbove.color === this.toy.color) {
            this.toy.y--;
            this.grab = false;
            this.toy.grabbed = false;
            this.toy = 'none';
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy = new Enemy;
var player = new Player;
var allEnemies = [enemy];
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

// Characters
var Characters = function(color, imageFile, position) {
    this.x = position;
    this.y = 0;
    this.color = color;
    this.imageFile = imageFile;
}

var charPosition = shuffle([0, 1, 2, 3, 4, 5, 6]);

var pinkKid = new Characters('pink', 'images/pink-kid.png', charPosition[0]);
var blueKid = new Characters('blue', 'images/blue-kid.png', charPosition[1]);
var greenKid = new Characters('green', 'images/green-kid.png', charPosition[2]);
var yellowKid = new Characters('yellow', 'images/yellow-kid.png', charPosition[3]);
var redKid = new Characters('red', 'images/red-kid.png', charPosition[4]);
var tealKid = new Characters('teal', 'images/teal-kid.png', charPosition[5]);
var purpleKid = new Characters('purple', 'images/purple-kid.png', charPosition[6]);   

var allKids = [pinkKid, blueKid, greenKid, yellowKid, redKid, tealKid, purpleKid];

Characters.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};

// Toys
var Toys = function(color, imageFile, position) {
    this.x = position;
    this.y = 6;
    this.color = color;
    this.imageFile = imageFile;
    this.grabbed = false;
}

var toyPosition = shuffle([0, 1, 2, 3, 4, 5, 6]);

var pinkToy = new Toys('pink', 'images/pink-toy.png', toyPosition[0]);
var blueToy = new Toys('blue', 'images/blue-toy.png', toyPosition[1]);
var greenToy = new Toys('green', 'images/green-toy.png', toyPosition[2]);
var yellowToy = new Toys('yellow', 'images/yellow-toy.png', toyPosition[3]);
var redToy = new Toys('red', 'images/red-toy.png', toyPosition[4]);
var tealToy = new Toys('teal', 'images/teal-toy.png', toyPosition[5]);
var purpleToy = new Toys('purple', 'images/purple-toy.png', toyPosition[6]);   

var allToys = [pinkToy, blueToy, greenToy, yellowToy, redToy, tealToy, purpleToy];

Toys.prototype.render = function() {
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