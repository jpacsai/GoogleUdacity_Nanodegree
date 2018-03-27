document.addEventListener('DOMContentLoaded', function () {

    let cards = Array.from(document.getElementsByClassName("card"));
    let count = 0;
    let matchedCards = 0;

    let openCards = [];
    let card1;
    let card2;

    let cardClick = 0;
    let timing;
    let secCounter = 0;
    let minCounter = 0;

    addCards();

    function addCards() {
        cards = shuffle(cards);
        const deck = document.querySelector('.deck');
        deck.style.display === "none";
        for (let card in cards) {
            deck.appendChild(cards[card]);
        }
        deck.style.display === "flex";
    }

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
  
    for (let x in cards) {
        cards[x].onclick = function(event) {
            cardClicked(event);
        };
    }

    function cardClicked(event) {
        cardClick++;
        if (cardClick === 1) {
            timer();
        }
        event.target.classList.add("open");
        setTimeout(function(){event.target.classList.add("show");}, 180);
        check(event);
    }

    function check(event) {
        openCards.push(event.target.innerHTML.trim());
        if (openCards.length === 1) {
            card1 = event.target;
        }
        else if (openCards.length === 2) {
            disable();
            counter();
            card2 = event.target;
            if (openCards[0] === openCards[1]) {
                match();
            }
            else {
                noMatch();
            }
        }
    }

    function match() {
        openCards.length = 0;
        card1.classList.add("match");
        card2.classList.add("match");
        card1 = null;
        card2 = null;
        enable();
        matchedCards++;
        if (matchedCards === 8) {
            win();
            stopTimer();
        }
    }

    function noMatch() {
        openCards.length = 0;
        setTimeout(function(){
            card1.classList.remove("open");
            card1.classList.remove("show");
            card2.classList.remove("open");
            card2.classList.remove("show");
            card1 = null;
            card2 = null;
            enable();
        }, 1200);
    }

    function disable() {
        for (let x in cards) {
            cards[x].classList.add('disable');
        }
    }

    function enable() {
        for (let x in cards) {
            cards[x].classList.remove('disable');
        }
    }

    function counter() {
        count++;
        document.querySelector('.moves').textContent = count;
    }
    
    function win() {
        const won = document.createElement("DIV");
        won.classList.add("winner");

        const wonHeader = document.createElement("H1");
        wonHeader.classList.add("winnerHeader");
        wonHeader.textContent = "Congratulation!";

        const wonText = document.createElement("H2");
        wonText.classList.add("winnerText");
        wonText.textContent = "You won with " + count + " moves";
        
        won.appendChild(wonHeader);
        won.appendChild(wonText);
        document.body.appendChild(won);  
    }

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

    function stopTimer() {
        clearInterval(timing);
    }

    function restart() {

    }
});