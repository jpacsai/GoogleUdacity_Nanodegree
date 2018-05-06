// TODO: optional - leaderboard

'use strict';
// - - - - VARIABLES - - - -
// characters
let allEnemies = [];
let allKids = [];
let allFish = [];

// counters
let fishCounter = 0;
let timing;
let secCounter = 0;
let minCounter = 0;

// screens
let won;
let lost;
let pauseScreen;

// sound and music
const mainMusic = new Audio('sounds/main.mp3');
mainMusic.loop = true;
const fishSound = new Audio('sounds/fish.wav');
const hurtSound = new Audio('sounds/hurt.wav');
const babySound = new Audio('sounds/baby.wav');
const gameOverSound = new Audio('sounds/game_over.wav');
const winSound = new Audio('sounds/win.wav');
const allSounds = [mainMusic, fishSound, hurtSound, babySound, gameOverSound, winSound];
let muted = false;

// - - - - ENEMIES - - - - 
// our player must avoid
let Enemy = function(length, file, speed, min, max, direction) {
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

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = (this.x + (-1 * this.direction) * this.speed * dt);
    if (this.direction === -1 && this.x > 7 || this.direction === 1 && this.x < -2) {
        this.x = this.direction === -1 ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 12) + 9);
        this.y = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
};

// instantiate enemies
for (let i = 0; i < 7; i++) {
    let enemy1 = new Enemy(2, 'images/enemy-seal.png', 2, 3, 6, 'right');
}
let polar = new Enemy(2, 'images/polar.png', 1, 2, 2, 'left');


// - - - - PLAYER CHARACTER - - - -
let Player = function() {
    this.playerImage = 'images/player.png';
    this.x = 3;
    this.y = 1;
    this.grab = false;
    this.fish = false;
    this.life = 3;
}

// check for collision with enemies - loose life and fish if player was holding it
Player.prototype.update = function() {  
    allEnemies.forEach(function(enemy){
        if ((enemy.direction === -1 && enemy.x + enemy.length - 0.2 >= player.x && enemy.x < player.x + 1 - 0.4 && player.y === enemy.y) || 
        (enemy.direction === 1 && enemy.x <= player.x + 1 - 0.4 && enemy.x + enemy.length - 0.4> player.x && player.y === enemy.y)) {   
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

// draw player character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.x * 101, this.y * 83 - 30);
}

// move player on game screen
Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y - 1 > 0) {
        this.y--;
        if (this.grab === true) {
            this.fish.y--;
        }
    }
    else if (key === 'down' && this.y + 1 <= Math.round(document.querySelector('canvas').height / 115)) {
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
    else if (key === 'right' && this.x + 1 < Math.round(document.querySelector('canvas').width / 100)) {
        this.x++;
        if (this.grab === true) {
            this.fish.x++;
        }
    }
    // grab a fish if on same block
    if (this.grab === false && allFish.find(a => a.x === player.x && a.y === player.y) !== undefined) {
        let grabbedFish = allFish.find(a => a.x === player.x && a.y === player.y);
        this.grab = true;
        grabbedFish.grabbed = true;
        this.fish = grabbedFish;
        fishSound.play();
    }
    // pass a fish to baby penguin if beneath one without a fish
    if (this.grab === true && this.y === 1) {
        let kidAbove = allKids.find(b => b.x === player.x);
        if (kidAbove.hasFish === false) {
            babySound.play();
            kidAbove.hasFish = true;
            this.fish.y--;
            this.grab = false;
            kidAbove.jump = true;
            this.fish.grabbed = false;
            fishCounter++;
            // if 7 fish is passed to baby penguin, the player wins
            if (fishCounter === 7) {
                disable();
                setTimeout(function() {
                    win();
                }, 1000);
            }
        }
    }
}

// instantiate player character
let player = new Player;

// - - - - INPUT HANDLER - - - -
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', movement);

function movement(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// - - - - BABY PENGUINS to feed - - - -
let Kids = function(position) {
    this.x = position;
    this.y = 0;
    this.imageFile = 'images/baby-penguin.png';
    this.hasFish = false;
    this.fishNumber = 'none';
    this.jump = false;
    allKids.push(this);
}

// draw baby penguins
Kids.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};

// if a fish passed, make a jump
Kids.prototype.update = function() {
    if (this.jump === true) {
        this.y -= 0.5;
        player.fish.y -= 0.5;
        let k = this;
        setTimeout(function() {
            k.y += 0.5;
            player.fish.y += 0.5;
        }, 200);
        this.jump = false;
    }
}

// instantiate baby penguins
for (let j = 0; j < 7; j++) {
    let kid = new Kids(j);
}

// - - - - FISH to collect - - - -
let Fish = function(x ,y) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.imageFile = 'images/fish.png';
    this.grabbed = false;
    allFish.push(this);
}

// shuffle array to randomize fish's x position
let fishX = shuffle([0, 1, 2, 3, 4, 5, 6]); 

// instantiate fish
for (let k = 0; k < 7; k++) {
    let fish = new Fish(fishX[k], Math.floor(Math.random() * (6 - 3 + 1) + 3));
}

// draw fish
Fish.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 101, this.y * 83 - 30);
};

// - - - - SHUFFLE FUNCTION to randomize order of characters - - - -
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


// - - - - TIMER - - - -
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

// - - - - CALL STARTER SCREEN - - - -
start();

// - - - - WINNER SCREEN - - - - 
function win() {
    // winner music
    // stop main music
    mainMusic.pause();
    // play winner music
    winSound.play();

    // stop timer
    clearInterval(timing);

    // create winner screen
    won = document.createElement('DIV');
    won.classList.add('winner');

    // add header
    let wonHeader = document.createElement('H1');
    wonHeader.classList.add('winnerHeader');
    wonHeader.textContent = 'Congratulation!';

    // add info about the game
    let wonText = document.createElement('H2');
    wonText.classList.add('winnerText');
    let wonInfo = minCounter === 0 ? 
        'You won in ' + secCounter + ' sec!' : 
        'You won in ' + minCounter + ' min ' + secCounter + ' sec!';
    wonText.textContent = wonInfo;

    // add new game button
    let newGameButton = document.createElement('DIV');
    newGameButton.classList.add('newGameButton');
    newGameButton.textContent = 'Play again?';

    // add press key comment
    let newGameComment = document.createElement('H3');
    newGameComment.classList.add('newGameComment');
    newGameComment.textContent = 'or press any key';
        
    won.append(wonHeader, wonText, newGameButton, newGameComment);

    document.body.appendChild(won);  

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
    // start main music
    mainMusic.play();

    // reset timer
    clearInterval(timing);
    document.querySelector('.secCount').textContent = '00';
    document.querySelector('.minCount').textContent = '00';

    // reshuffle fish's x position
    fishX = shuffle([0, 1, 2, 3, 4, 5, 6]);

    // randomize fish position
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

    // reset baby penguins has fish
    allKids.forEach(function(kid) {
        kid.hasFish = false;
    })
        
    // reset life
    let addLife = player.life === -1 ? 3 : 3 - player.life;
    if (addLife !== 0) {
        let fragment = document.createDocumentFragment();
        for (let m = 0; m < addLife; m++) {
            let heart = document.createElement('IMG');
            heart.classList.add('heart');
            heart.src = 'IMAGES/HEART.PNG';
            fragment.appendChild(heart);
        }
        document.querySelector('.life').appendChild(fragment);
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

    // start timer
    timer();

    // enable movement
    enable();
}

// - - - - VOLUME FUNCTION - - - -
const volumeButton = document.querySelector('.volume');

volumeButton.onclick = function() {
    let icon = document.querySelector('.volume-icon').classList;
    // if not muted pause main music and mute all sounds
    if (muted === false) {
        mainMusic.pause();
        allSounds.forEach(function(sound) {
            sound.muted = true;
        })
        // change icon
        icon.replace('fa-volume-up', 'fa-volume-off');
        muted = true;
    }
    // if muted start main music unmute sounds
    else {
        mainMusic.play();
        allSounds.forEach(function(sound) {
            sound.muted = false;
        });
        // change back icon
        icon.replace('fa-volume-off', 'fa-volume-up');
        muted = false;
    }
};

// GAME OVER SCREEN
function loose() {

    // stop main music
    mainMusic.pause();
    // play game over sound
    gameOverSound.play();
    
    // disable movement
    disable();

    // clear timer
    clearInterval(timing);

    // CREATE GAME OVER SCREEN
    lost = document.createElement('DIV');
    lost.classList.add('lost');

    // add header
    let lostHeader = document.createElement('H1');
    lostHeader.classList.add('lostHeader');
    lostHeader.textContent = 'GAME OVER';

    // add new game button
    let newGameButton = document.createElement('DIV');
    newGameButton.classList.add('newGameButton');
    newGameButton.textContent = 'Play again?';

    // add key press comment
    let newGameComment = document.createElement('H3');
    newGameComment.classList.add('newGameComment');
    newGameComment.textContent = 'or press any key';
        
    lost.append(lostHeader, newGameButton, newGameComment);

    document.body.appendChild(lost);  

    // event listeners for new game button - click or keypress
    newGameButton.onclick = function(){
        restart();
    };
    window.addEventListener('keypress', restart, false);
}

// - - - - LIFE COUNTER IN STAT PANEL - - - -
function looseLife() {
    // remove a heart image
    let child = document.getElementsByClassName('heart')[player.life];
    child.parentNode.removeChild(child);
}

// - - - - PAUSE BUTTON  - - - -
const pauseButton = document.querySelector('.pause');
pauseButton.onclick = function() {
    pause();
};

// - - - - PAUSE - - - 
function pause() {
    // clear timer
    clearInterval(timing);

    // create pause screen
    pauseScreen = document.createElement('DIV');
    pauseScreen.classList.add('pause-screen');

    let pauseText = document.createElement('H1');
    pauseText.textContent = 'Game paused';
    pauseScreen.appendChild(pauseText);

    let pauseComment = document.createElement('H3');
    pauseComment.textContent = 'press any key or click to return';
    pauseScreen.appendChild(pauseComment);

    document.body.appendChild(pauseScreen); 

    // disable movement
    disable();
    
    // event listener to restart a game with a keypress or a click
    pauseScreen.onclick = function() {
        resume();
    };
    window.addEventListener('keypress', resume);
}

// - - - - RESUME the game after it was paused - - - -
function resume() {
    // enable movement
    enable();

    // hide pause screen and remove
    pauseScreen.style.display === 'none';
    pauseScreen.remove();

    // start timer again
    timer();
}

// - - - - DISABLE movement - - - -
function disable() {
    // set enemies' speed to zero
    allEnemies.forEach(function(enemy){
        enemy.speed = 0;
    })
    // remove input handler for player
    document.removeEventListener('keyup', movement);
}

// - - - - ENABLE movement - - - - 
function enable() {
    // remove event listener for keypress
    window.removeEventListener('keypress', resume);
    
    // add input handler back for player
    document.addEventListener('keyup', movement);

    // reset enemies' speed to original
    allEnemies.forEach(function(enemy){
        enemy.speed = enemy.originalSpeed;
    })
}

// - - - - START SCREEN - - - - 
function start() {
    // CREATE START SCREEN
    start = document.createElement('DIV');
    start.classList.add('start');

    // add header
    let startHeader = document.createElement('H1');
    startHeader.classList.add('startHeader');
    startHeader.textContent = 'How to play?';

    // add info about the game
    let instructions = document.createElement('DIV');

    let firstLine = document.createElement('DIV');
    firstLine.classList.add('instruction-div');

    let fishImage = document.createElement('IMG');
    fishImage.classList.add('fish');
    fishImage.src = 'images/fish-small.png';
    
    let firstLineText = document.createElement('H2');
    firstLineText.classList.add('instruction-first-line');
    firstLineText.textContent = 'Collect fish for the baby penguins.'

    firstLine.append(fishImage, firstLineText);

    let secondLine = document.createElement('H2');
    secondLine.classList.add('instruction-text');
    secondLine.textContent = 'When all the little ones have a fish, you win!'

    let thirdLine = document.createElement('H2');
    thirdLine.classList.add('instruction-text');
    thirdLine.textContent = 'You can move with the arrow keys (← ↑ → ↓) but make sure you avoid enemies.'

    instructions.append(firstLine, secondLine, thirdLine);

    // add new game button
    let startGameButton = document.createElement('DIV');
    startGameButton.classList.add('startGameButton');
    startGameButton.textContent = 'Start game';

    // add key press comment
    let startGameComment = document.createElement('H3');
    startGameComment.classList.add('startGameComment');
    startGameComment.textContent = 'or press any key';
        
    start.append(startHeader, instructions, startGameButton, startGameComment);

    document.body.appendChild(start);  

    // disable movement
    disable();
    
    // event listeners for new game button - click or keypress
    startGameButton.onclick = function() {
        startGame();
    };

    window.addEventListener('keypress', startGame, false);
}

// - - - - START GAME - - - -
function startGame() {
    // enable movement
    enable();

    // remove start screen
    start.style.display === 'none';
    start.remove();

    // start timer
    timer();

    // start main music
    mainMusic.play();
}