'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener("DOMContentLoaded", function () {
    var Cat = function () {
        function Cat(id, name, url) {
            _classCallCheck(this, Cat);

            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
            this.create();
        }

        _createClass(Cat, [{
            key: 'create',
            value: function create() {
                var kittyContainer = document.createElement('SECTION');
                kittyContainer.id = this.id;
                kittyContainer.classList.add('kittyContainer', this.name);

                var kittyHeader = document.createElement('H3');
                kittyHeader.classList.add('instruction');
                kittyHeader.setAttribute('style', 'white-space: pre;');
                kittyHeader.textContent = 'Click on\r\n';
                kittyHeader.textContent += this.name + '!';

                var catImage = document.createElement('IMG');
                catImage.classList.add('cat');
                catImage.src = this.url;

                var counter = document.createElement('DIV');
                counter.classList.add('counter');
                counter.textContent = 'Clicks: ';

                var clickCounter = document.createElement('SPAN');
                clickCounter.classList.add('click-count');
                clickCounter.textContent = this.click;

                counter.appendChild(clickCounter);

                kittyContainer.append(kittyHeader, catImage, counter);

                var parent = document.querySelector('.cat-container');
                parent.appendChild(kittyContainer);
            }
        }, {
            key: 'clicker',
            value: function clicker() {
                this.click++;
            }
        }]);

        return Cat;
    }();

    (function instantiateCats() {
        var cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
        var bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
        var cats = [cecile, bertalan];
        createList(cats);

        var catImages = Array.from(document.getElementsByClassName('cat'));
        for (var i in catImages) {
            catImages[i].onclick = function (event) {
                catClicked(event, cats);
            };
        }
    })();

    function createList(cats) {
        var d = document.createDocumentFragment();
        for (var c in cats) {
            var li = document.createElement('LI');
            li.classList.add('cat-list-element');
            li.textContent = cats[c].name;
            d.appendChild(li);
        }
        document.querySelector('.name-list').appendChild(d);
    }

    function catClicked(event, cats) {
        var element = event.target.parentElement;
        var obj = cats.find(function (x) {
            return x.id === element.id;
        });
        obj.clicker();
        element.lastChild.lastChild.textContent = obj.click;
    };
});