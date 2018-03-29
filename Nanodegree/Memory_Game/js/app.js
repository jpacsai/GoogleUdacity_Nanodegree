document.addEventListener('DOMContentLoaded', function () {

    let cards = Array.from(document.getElementsByClassName("card"));
    let openCards = [];
    let card1;
    let card2;

    // counter variables
    let moveCounter = 0;
    let matchedCards = 0;
    let cardClick = 0;
    let starCounter = 3;
    let secCounter = 0;
    let minCounter = 0;
    let timing;

    // js DOM elements
    let won;
    let pauseScreen;

    addCards();

    // add shuffled cards to page
    function addCards() {
        cards = shuffle(cards);
        const deck = document.querySelector('.deck');
        deck.style.display === "none";
        for (let card in cards) {
            deck.appendChild(cards[card]);
        }
        deck.style.display === "flex";
    }

    // shuffle function
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
  
    // click on cards triggers cardClicked function
    for (let x in cards) {
        cards[x].onclick = function(event) {
            cardClicked(event);
        };
    }

    // counts clicks on cards, first one starts timer
    // flips open cards
    function cardClicked(event) {
        cardClick++;
        if (cardClick === 1) {
            timer();
        }
        event.target.classList.add("open");
        setTimeout(function(){event.target.classList.add("show");}, 180);
        check(event);
    }

    // adds card to openCards array
    function check(event) {
        openCards.push(event.target.innerHTML.trim());
        if (openCards.length === 1) {
            card1 = event.target;
        }
        // if two cards are open  
        else if (openCards.length === 2) {
            disable(); // disable clicking on another
            counter(); // add a move to move counter
            card2 = event.target;
            // the cards are a match / no match, call relevant function
            if (openCards[0] === openCards[1]) {
                match();
            }
            else {
                noMatch();
            }
            // if over 14 moves, take away a star
            if (moveCounter === 15) {
                starCounter = 2;
                star2();
            }
            // if over 19 moves, take away another star
            else if (moveCounter === 20) {
                starCounter = 1;
                star1();
            }
        }
    }

    // if two cards are a match
    function match() {
        openCards.length = 0;

        // add match animation
        card1.classList.add("match");
        card2.classList.add("match");
        card1 = null;
        card2 = null;
        enable(); //enable clicking on other card
        matchedCards++; // count matched pairs

        // if all 8 pairs are found
        if (matchedCards === 8) { 
            // stop timer
            clearInterval(timing);
            // call winner screen
            setTimeout(function() {
                win()
            }, 1000);
        }
    }

    // if cards are no match
    function noMatch() {
        openCards.length = 0;

        // add no match animation
        setTimeout(function(){
            card1.classList.add('unMatch');
            card2.classList.add('unMatch');
            setTimeout(function() {
                card1.classList.remove("unMatch");
                card2.classList.remove("unMatch");
            }, 700);
        }, 800);

        // flip back the cards
        setTimeout(function() {
            card1.classList.remove('open', 'show');
            card2.classList.remove('open', 'show');
            card1 = null;
            card2 = null;
            enable();
        }, 2000);
    }

    // function to disable clicking on other cards when two cards are open
    function disable() {
        for (let x in cards) {
            cards[x].classList.add('disable');
        }
    }

    // allow clicking again
    function enable() {
        for (let x in cards) {
            cards[x].classList.remove('disable');
        }
    }

    // function for move counter
    function counter() {
        moveCounter++;
        document.querySelector('.moves').textContent = moveCounter;
    }
    
    // winning screen
    function win() {
        won = document.createElement("DIV");
        won.classList.add("winner");

        // add header
        const wonHeader = document.createElement("H1");
        wonHeader.classList.add("winnerHeader");
        wonHeader.textContent = "Congratulation!";

        // add info about the game
        const wonText = document.createElement("H2");
        wonText.classList.add("winnerText");
        wonText.textContent = "You won with " + moveCounter + " moves in " + minCounter + " min " + secCounter + " sec!";

        // add stars earned
        const wonStar = document.createElement("DIV");
        for (let i = 0; i < starCounter; i++) {
            const wonStarOne = document.createElement("I");
            wonStarOne.classList.add('fa','fa-star','fa-3x','wonStar');
            wonStar.appendChild(wonStarOne);
        } 

        // add new game button
        const newGameButton = document.createElement('DIV');
        newGameButton.classList.add('newGameButton');
        newGameButton.textContent = 'Play again?';
        
        won.appendChild(wonHeader);
        won.appendChild(wonText);
        won.appendChild(wonStar);
        won.appendChild(newGameButton);

        document.body.appendChild(won);  

        // event listeners for new game button - click or keypress
        newGameButton.onclick = function(){
            restart()
        };
        window.addEventListener('keypress', restart, false);
    }

    // timer function
    function timer() {
        timing = setInterval(function(){
            secCounter++;
            if (secCounter === 60) {
                secCounter = 0;
                document.querySelector('.secCount').textContent = secCounter;
                minCounter++;
                document.querySelector('.minCount').textContent = minCounter;
            }
            else {
                document.querySelector('.secCount').textContent = secCounter;
            }
        },1000);
    }

    // restart button 
    const restartButton = document.querySelector(".restart");
    restartButton.onclick = function() {
        restart();
    };

    // restart function, starts a new game
    function restart() {
        // disable clicking on cards until new game is started
        disable();

        window.removeEventListener('keypress', restart, false);
        
        // reset timer
        clearInterval(timing);
        document.querySelector('.secCount').textContent = 0;
        document.querySelector('.minCount').textContent = 0;

        // reset moves counter
        moveCounter = 0;
        document.querySelector('.moves').textContent = 0;

        // turn back open cards, reshuffle deck
        for (let card in cards) {
            cards[card].classList.remove("open", "show", "match");
        }
        setTimeout(function(){ addCards(); }, 400);

        // reset stars
        let stars = Array.from(document.getElementsByClassName("fa"));
        for (let s in stars) {
            stars[s].classList.replace('fa-star-o', 'fa-star');
        }

        // reset variables
        cardClick = 0;
        card1 = null;
        card2 = null;
        matchedCards = 0;
        starCounter = 3;
        secCounter = 0;
        minCounter = 0;

        // remove won screen if new game initiated from there
        if (won !== undefined) {
            won.style.display === "none";
            won.remove();
        }
        
        // enable clicking again
        enable();
    }

    // remove the first star
    function star2() {
        let star = document.getElementsByClassName("fa")[2].classList;
        star.replace('fa-star', 'fa-star-o');
    }

    // remove the second star
    function star1() {
        let star = document.getElementsByClassName("fa")[1].classList;
        star.replace('fa-star', 'fa-star-o');
    }

    // button to pause the game with event handler
    const pauseButton = document.querySelector(".pause");
    pauseButton.onclick = function() {
        pause();
    };

    // function to pause the game
    function pause() {
        // clear timer variable
        clearInterval(timing);
        // disable clicking
        disable();

        // create pause screen
        pauseScreen = document.createElement("DIV");
        pauseScreen.classList.add("pause-screen");

        const pauseText = document.createElement('H1');
        pauseText.textContent = "Game paused";
        pauseScreen.appendChild(pauseText);

        const pauseComment = document.createElement('H3');
        pauseComment.textContent = "press any key to return";
        pauseScreen.appendChild(pauseComment);

        const pauseImg = document.createElement("IMG");
        pauseImg.classList.add("pause-img");
        pauseImg.src = "IMG/PAUSE.PNG";
        pauseScreen.appendChild(pauseImg);

        document.body.appendChild(pauseScreen); 
        
        // event listener to restart a game with a keypress or a click
        window.addEventListener('keypress', resume);
        //window.addEventListener('click', resume);
    }

    // function to resume the game after it was paused
    function resume() {
        // remove event listeners
        window.removeEventListener('keypress', resume);
        window.removeEventListener('click', resume);

        // hide pause screen and remove
        pauseScreen.style.display === "none";
        pauseScreen.remove();
        if (cardClick >= 1) {
            timer();
        }

        // enable clicking again
        enable();
    }
});