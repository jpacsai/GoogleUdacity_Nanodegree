// TO-DO:
// find game over and winner sound
// fix restart
// fix starter screen with instructions
// fix collision distances

var allEnemies = [];
var allKids = [];
var allFish = [];
var fishCounter = 0;
var secCounter = 0;
var minCounter = 0;
var won;
var lost;
var pauseScreen;
var mainMusic = new Audio('sounds/main.mp3');
mainMusic.loop = true;
var fishSound = new Audio('sounds/fish.wav');
var hurtSound = new Audio('sounds/hurt.wav');
var babySound = new Audio('sounds/baby.wav');


// Enemies our player must avoid
var Enemy = function(length, file, speed, min, max, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.direction = direction === 'right' ? -1 : 1;
    this.x = direction === 'right' ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
    this.y = Math.floor(Math.random() * (max - min + 1) + min);
    this.length = length;
    this.originalSpeed = speed;
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
    this.life = 3;
}

Player.prototype.update = function() {  
    allEnemies.forEach(function(enemy){
        if ((enemy.direction === -1 && enemy.x + enemy.length - 0.4 >= player.x && enemy.x < player.x && player.y === enemy.y) || 
        (enemy.direction === 1 && enemy.x <= player.x + 1 - 0.4 && enemy.x + enemy.length - 0.4 > player.x && player.y === enemy.y)) {   
            player.x = 3;
            player.y = 1;
            player.life--;
            if (player.grab === true) {
                player.fish.x = player.fish.originalX;
                player.fish.y = player.fish.originalY;
                player.fish.grabbed = false;
                player.grab = false;
            }
            if (player.life < 0) {
                loose();
            }
            else {
                hurtSound.play();
                looseLife();
            }
        }
    });
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
        fishSound.play();
    }
    if (this.grab === true && this.y === 1) {
        let kidAbove = allKids.find(b => b.x === player.x);
        if (kidAbove.hasFish === false) {
            babySound.play();
            kidAbove.hasFish = true;
            this.fish.y--;
            this.grab = false;
            this.fish.grabbed = false;
            fishCounter++;
            if (fishCounter === 7) {
                setTimeout(function() {
                    win();
                }, 1000);
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
document.addEventListener('keyup', movement);

function movement(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// Baby penguins
var Kids = function(position) {
    this.x = position;
    this.y = 0;
    this.imageFile = 'images/baby-penguin.png';
    this.hasFish = false;
    allKids.push(this);
}

Kids.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};

for (let i = 0; i < 7; i++) {
    var kid = new Kids(i);
}

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


// Timer
function timer() {
    timing = setInterval(function(){
        secCounter++;
        // add leading zero to seconds
        if (String(secCounter).length === 1) {
            secCounter = '0' + secCounter;
        }
        // if seconds reaches 60 reset seconds, increment minutes
        if (secCounter === 60) {
            secCounter = '00';
            document.querySelector('.secCount').textContent = secCounter;
            minCounter++;
            // add leading zero to minutes
            if (String(minCounter).length === 1) {
                minCounter = '0' + minCounter;
            }
            document.querySelector('.minCount').textContent = minCounter;
        }
        else {
            document.querySelector('.secCount').textContent = secCounter;
        }
    },1000);
}

start();

// - - - - WINNER SCREEN - - - - 
function win() {
    clearInterval(timing);
    won = document.createElement('DIV');
    won.classList.add('winner');

    // add header
    const wonHeader = document.createElement('H1');
    wonHeader.classList.add('winnerHeader');
    wonHeader.textContent = 'Congratulation!';

    // add info about the game
    const wonText = document.createElement('H2');
    wonText.classList.add('winnerText');
    let wonInfo = minCounter === 0 ? 
        'You won in ' + secCounter + ' sec!' : 
        'You won in ' + minCounter + ' min ' + secCounter + ' sec!';
    wonText.textContent = wonInfo;

    // add new game button
    const newGameButton = document.createElement('DIV');
    newGameButton.classList.add('newGameButton');
    newGameButton.textContent = 'Play again?';

    // add key press comment
    const newGameComment = document.createElement('H3');
    newGameComment.classList.add('newGameComment');
    newGameComment.textContent = 'or press any key';
        
    won.append(wonHeader, wonText, newGameButton, newGameComment);

    document.body.appendChild(won);  

    disable();

    // event listeners for new game button - click or keypress
    newGameButton.onclick = function(){
        restart()
    };
    window.addEventListener('keypress', restart, false);
}

// - - - - RESTART FUNCTION - - - -
const restartButton = document.querySelector('.restart');

    restartButton.onclick = function() {
        restart();
    };

    // restart function, starts a new game
    function restart() {

        // reset timer
        clearInterval(timing);
        document.querySelector('.secCount').textContent = '00';
        document.querySelector('.minCount').textContent = '00';

        fishX = shuffle([0, 1, 2, 3, 4, 5, 6]);

        // randomize fish
        allFish.forEach(function(fish, index) {
            fish.x = fishX[index];
            fish.y = Math.floor(Math.random() * (6 - 3 + 1) + 3);
            fish.grabbed = false;
        });

        // reset and randomize enemies
        allEnemies.forEach(function(enemy) {
            enemy.x = enemy.direction === 1 ? enemy.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
            enemy.y = Math.floor(Math.random() * (enemy.max - enemy.min + 1) + enemy.min);
        })
        polar.x = polar.direction === 1 ? polar.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
        polar.y = Math.floor(Math.random() * (polar.max - polar.min + 1) + polar.min);

        // reset baby penguins
        allKids.forEach(function(kid) {
            kid.hasFish = false;
        })
        
        // reset life
        var addLife = 3 - player.life;
        var l = document.getElementById('life');
        if (addLife !== 0) {
            var fragment = document.createDocumentFragment();
            for (let i = 0; i < addLife; i++) {
                var heart = document.createElement('IMG');
                heart.classList.add('heart');
                heart.src = 'IMAGES/HEART.PNG';
                fragment.appendChild(heart);
            }
            l.appendChild(fragment);
        }

        // remove screen if new game initiated from there
        if (won !== undefined) {
            won.style.display === 'none';
            won.remove();
        }

        if (pauseScreen !== undefined) {
            pauseScreen.style.display === 'none';
            pauseScreen.remove();
        }

        if (lost !== undefined) {
            lost.style.display === 'none';
            lost.remove();
        }

        // reset variables
        secCounter = 0;
        minCounter = 0;
        player.x = 3;
        player.y = 1; 
        player.life = 3;
        fishCounter = 0;

        timer();
        enable();
    }

// GAME OVER SCREEN
function loose() {

    disable();

    clearInterval(timing);
    lost = document.createElement('DIV');
    lost.classList.add('lost');

    // add header
    const lostHeader = document.createElement('H1');
    lostHeader.classList.add('lostHeader');
    lostHeader.textContent = 'GAME OVER';

    // add new game button
    const newGameButton = document.createElement('DIV');
    newGameButton.classList.add('newGameButton');
    newGameButton.textContent = 'Play again?';

    // add key press comment
    const newGameComment = document.createElement('H3');
    newGameComment.classList.add('newGameComment');
    newGameComment.textContent = 'or press any key';
        
    lost.append(lostHeader, newGameButton, newGameComment);

    document.body.appendChild(lost);  

    // event listeners for new game button - click or keypress
    newGameButton.onclick = function(){
        restart()
    };
    window.addEventListener('keypress', restart, false);
}

// LIFE COUNTER IN STAT PANEL
function looseLife() {
    var child = document.getElementsByClassName('heart')[player.life];
    child.parentNode.removeChild(child);
}

// - - - - PAUSE BUTTON  - - - -

const pauseButton = document.querySelector('.pause');
pauseButton.onclick = function() {
    pause();
};

// function to pause the game
function pause() {
    // clear timer variable
    clearInterval(timing);

    // create pause screen
    pauseScreen = document.createElement('DIV');
    pauseScreen.classList.add('pause-screen');

    const pauseText = document.createElement('H1');
    pauseText.textContent = 'Game paused';
    pauseScreen.appendChild(pauseText);

    const pauseComment = document.createElement('H3');
    pauseComment.textContent = 'press any key or click to return';
    pauseScreen.appendChild(pauseComment);

    document.body.appendChild(pauseScreen); 

    disable();
    
    // event listener to restart a game with a keypress or a click
    pauseScreen.onclick = function() {
        resume();
    };
    window.addEventListener('keypress', resume);
}

// function to resume the game after it was paused
function resume() {
    enable();

    // hide pause screen and remove
    pauseScreen.style.display === 'none';
    pauseScreen.remove();
    timer();
}

function disable() {
    allEnemies.forEach(function(enemy){
        enemy.speed = 0;
    })
    console.log('disabled');
    document.removeEventListener('keyup', movement);
}

function enable() {
    window.removeEventListener('keypress', resume);
    
    document.addEventListener('keyup', movement);

    allEnemies.forEach(function(enemy){
        enemy.speed = enemy.originalSpeed;
    })
}

// - - - - START SCREEN - - - - 
function start() {
    start = document.createElement('DIV');
    start.classList.add('start');

    // add header
    const startHeader = document.createElement('H1');
    startHeader.classList.add('startHeader');
    startHeader.textContent = 'How to play?';

    // add info about the game
    const startText = document.createElement('H2');
    startText.classList.add('startText');
    startText.textContent = "Collect fish for the baby penguins. When all the babies have a fish, you win! You can move with the arrow keys (left / right / up / down). Make sure you avoid enemies."

    // add new game button
    const startGameButton = document.createElement('DIV');
    startGameButton.classList.add('startGameButton');
    startGameButton.textContent = 'Start game';

    // add key press comment
    const startGameComment = document.createElement('H3');
    startGameComment.classList.add('startGameComment');
    startGameComment.textContent = 'or press any key';
        
    start.append(startHeader, startText, startGameButton, startGameComment);

    document.body.appendChild(start);  
    disable();
    // event listeners for new game button - click or keypress
    startGameButton.onclick = function(){
        enable();
        start.style.display === 'none';
        start.remove();
        timer();
        mainMusic.play();
    };
    window.addEventListener('keypress', restart, false);
}