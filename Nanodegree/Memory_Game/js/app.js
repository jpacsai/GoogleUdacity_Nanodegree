document.addEventListener('DOMContentLoaded', function () {

    let cards = Array.from(document.getElementsByClassName("card"));
    let count = 0;
    let matchedCards = 0;

    let openCards = [];
    let card1;
    let card2;

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
            counter();
            disable();
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
        
    }

    function noMatch() {
        
    }

    function disable() {
        
    }

    function enable() {
        
    }

    function counter() {
       
    }
    
    function win() {
        
    }

    function restart() {

    }
});