// TODO: optional - leaderboard

'use strict';
// - - - - VARIABLES - - - -
// characters
const allEnemies = [];
const allKids = [];
const allFish = [];

// counters
let fishCounter = 0;
let timing;
let time = false;
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


// - - - - CHARACTER - - - -
// basic character class
class Character {
    constructor(sprite, x, y) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 30);
    }
}

// - - - - PLAYER CHARACTER - - - -
class Player extends Character {
    constructor(sprite, x, y) {
        super(sprite, x , y);
        this.grab = false;
        this.fish = false;
        this.life = 3;
    }
    
    // check for collision with enemies - loose life and fish if player was holding it
    update() {  
        allEnemies.forEach(function(enemy){
            if ((enemy.direction === -1 && enemy.x + enemy.length - 0.2 >= this.x && enemy.x < this.x + 1 - 0.4 && this.y === enemy.y) || 
            (enemy.direction === 1 && enemy.x <= this.x + 1 - 0.4 && enemy.x + enemy.length - 0.4> this.x && this.y === enemy.y)) {   
                this.x = 3;
                this.y = 1;
                this.life--;
                this.sprite = 'images/player.png';
                if (this.grab === true) {
                    this.fish.x = this.fish.originalX;
                    this.fish.y = this.fish.originalY;
                    this.fish.sprite = 'images/fish.png';
                    this.fish.grabbed = false;
                    this.grab = false;
                }
                if (this.life < 0) {
                    loose();
                }
                else {
                    hurtSound.play();
                    looseLife();
                }
            }
        }.bind(this));
    }

    // move player on game screen
    handleInput(key) {
        if (key === 'up' && this.y - 1 > 0) {
            this.y--;
            if (this.y === 1) {
                this.sprite = 'images/player.png';
            }
            else {
                this.sprite = 'images/player-swim-up.png';
            }
            if (this.grab === true) {
                this.fish.y--;
                this.fish.sprite = 'images/fish.png';
            }
        }
        else if (key === 'down' && this.y + 1 <= Math.round(document.querySelector('canvas').height / 115)) {
            this.y++;
            if (this.y === 2) {
                this.sprite = 'images/player-swim-up.png';
            }
            else {
                this.sprite = 'images/player-swim-down.png';
            }
            if (this.grab === true) {
                this.fish.y++;
                this.fish.sprite = 'images/fish-swim-down.png'
            }
        }
        else if (key === 'left' && this.x - 1 >= 0) {
            this.x--;
            if (this.y === 1) {
                this.sprite = 'images/player.png';
            }
            else {
                this.sprite = 'images/player-swim-left.png';
            }
            if (this.grab === true) {
                this.fish.x--;
                if (this.y === 1) {
                    this.fish.sprite = 'images/fish.png';
                }
                else {
                    this.fish.sprite = 'images/fish-swim-left.png';
                }
            }
        }
        else if (key === 'right' && this.x + 1 < Math.round(document.querySelector('canvas').width / 100)) {
            this.x++;
            if (this.y === 1) {
                this.sprite = 'images/player.png';
            }
            else {
                this.sprite = 'images/player-swim-right.png';
            }
            if (this.grab === true) {
                this.fish.x++;
                if (this.y === 1) {
                    this.fish.sprite = 'images/fish.png';
                }
                else {
                    this.fish.sprite = 'images/fish-swim-right.png';
                }
            }
        }
        // grab a fish if on same block
        if (this.grab === false && allFish.find(a => a.x === this.x && a.y === this.y) !== undefined) {
            let grabbedFish = allFish.find(a => a.x === this.x && a.y === this.y);
            this.grab = true;
            grabbedFish.grabbed = true;
            this.fish = grabbedFish;
            fishSound.play();
        }
        // pass a fish to baby penguin if beneath one without a fish
        if (this.grab === true && this.y === 1) {
            let kidAbove = allKids.find(b => b.x === this.x);
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

}

// - - - - INPUT HANDLER - - - -
// This listens for key presses and sends the keys to Player.handleInput() method
function movement(e) {
    
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

// - - - - ENEMIES - - - - 
// our player must avoid
class Enemy extends Character {
    constructor(sprite, direction, length, speed, min, max) {
        super(sprite);
        this.direction = direction === 'right' ? -1 : 1;
        this.x = direction === 'right' ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
        this.y = Math.floor(Math.random() * (max - min + 1) + min);
        this.length = length;
        this.originalSpeed = speed;
        this.speed = speed;
        this.min = min;
        this.max = max;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = (this.x + (-1 * this.direction) * this.speed * dt);
        if (this.direction === -1 && this.x > 7 || this.direction === 1 && this.x < -2) {
            this.x = this.direction === -1 ? this.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 12) + 9);
            this.y = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
        }
    }
}

// - - - - BABY PENGUINS to feed - - - -
class Kids extends Character {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.hasFish = false;
        this.fishNumber = 'none';
        this.jump = false;
    }

    update() {
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
}

// - - - - FISH to collect - - - -
class Fish extends Character {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.originalX = x;
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.grabbed = false;
    }
}

// shuffle array to randomize fish's x position
let fishX = shuffle([0, 1, 2, 3, 4, 5, 6]); 

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

// - - - - INSTANTIATE CHARACTERS
// player character
let player = new Player('images/player.png', 3, 1);

// enemies
for (let i = 0; i < 7; i++) {
    let e = new Enemy('images/enemy-seal.png', 'right', 2, 2, 3, 6);
    allEnemies.push(e);
}
let polar = new Enemy('images/polar.png', 'left', 2, 1, 2, 2);

// baby penguins
for (let j = 0; j < 7; j++) {
    let k = new Kids('images/baby-penguin.png', j, 0);
    allKids.push(k);
}

// fish
for (let k = 0; k < 7; k++) {
    let f = new Fish('images/fish.png', fishX[k], Math.floor(Math.random() * (6 - 3 + 1) + 3));
    allFish.push(f);
}

// - - - - TIMER - - - -
function timer() {
    if (time === false) {
        time = true;
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
}

function stopTimer() {
    if (time === true) {
        clearInterval(timing);
        time = false;
    }
}
// - - - - CALL STARTER SCREEN - - - -
start();

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
    firstLineText.textContent = 'Collect fish for the baby penguins.';

    firstLine.append(fishImage, firstLineText);

    let secondLine = document.createElement('H2');
    secondLine.classList.add('instruction-text');
    secondLine.textContent = 'When all the little ones have a fish, you win!';

    let thirdLine = document.createElement('H2');
    thirdLine.classList.add('instruction-text');
    thirdLine.textContent = 'You can move with the arrow keys (← ↑ → ↓) but make sure you avoid enemies.';

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
    start.style.display = 'none';
    start.remove();

    // start timer
    timer();

    // start main music
    mainMusic.play();
}

// - - - - LIFE COUNTER IN STAT PANEL - - - -
function looseLife() {
    // remove a heart image
    let child = document.getElementsByClassName('heart')[player.life];
    child.parentNode.removeChild(child);
}

// - - - - RESTART FUNCTION - - - -
const restartButton = document.querySelector('.restart');

restartButton.onclick = function() {
    restart();
};

// restart function, starts a new game
function restart() {
    window.removeEventListener('keypress', restart);

    // start main music
    mainMusic.play();

    // reset timer
    stopTimer();
    
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
    });
    polar.x = polar.direction === 1 ? polar.direction * (Math.floor(Math.random() * 10) + 3) : (Math.floor(Math.random() * 10) + 7);
    polar.y = Math.floor(Math.random() * (polar.max - polar.min + 1) + polar.min);

    // reset baby penguins has fish
    allKids.forEach(function(kid) {
        kid.hasFish = false;
    });
        
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
        won.style.display = 'none';
        won.remove();
    }

    if (lost !== undefined) {
        lost.style.display = 'none';
        lost.remove();
    }

    // reset variables
    secCounter = 0;
    minCounter = 0;
    player.x = 3;
    player.y = 1; 
    player.life = 3;
    fishCounter = 0;

    // enable movement
    enable();

    // start timer
    timer();
}

// - - - - PAUSE BUTTON  - - - -
const pauseButton = document.querySelector('.pause');
pauseButton.onclick = function() {
    pause();
};

// - - - - PAUSE - - - 
function pause() {
    // clear timer
    stopTimer();

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
    
    // event listener to resume a game with a keypress or click
    window.addEventListener('keydown', resume);
    pauseScreen.onclick = function() {
        resume();
    };
    
}

// - - - - RESUME the game after it was paused - - - -
function resume() {
    window.removeEventListener('keypress', resume);

    // hide pause screen and remove
    if (pauseScreen !== undefined) {
        pauseScreen.style.display = 'none';
        pauseScreen.remove();
    }
    
    // enable movement
    enable();

    // start timer again
    timer();
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
        });
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

// - - - - DISABLE movement - - - -
function disable() {
    // set enemies' speed to zero
    allEnemies.forEach(function(enemy){
        enemy.speed = 0;
    });
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
    });
}

// - - - - WINNER SCREEN - - - - 
function win() {
    // winner music
    // stop main music
    mainMusic.pause();
    // play winner music
    winSound.play();

    // stop timer
    stopTimer();

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
        winSound.pause();
        winSound.currentTime = 0;
        restart();
    };
    window.addEventListener('keypress', restart);
}

// GAME OVER SCREEN
function loose() {

    // stop main music
    mainMusic.pause();
    // play game over sound
    gameOverSound.play();
    
    // disable movement
    disable();

    // clear timer
    stopTimer();

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
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
        restart();
    };
    window.addEventListener('keypress', restart);
}

