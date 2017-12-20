(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _frame = require('./components/frame.js');

var _frame2 = _interopRequireDefault(_frame);

var _slides = require('./components/slides.js');

var _slides2 = _interopRequireDefault(_slides);

var _circles = require('./components/circles.js');

var _circles2 = _interopRequireDefault(_circles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./components/circles.js":2,"./components/frame.js":3,"./components/slides.js":4}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(x, y, r, c) {
        _classCallCheck(this, Circle);

        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    _createClass(Circle, [{
        key: 'create',
        value: function create() {
            var $circle = document.createElement('div');
            $circle.classList.add('circle');
            $circle.classList.add('circle-' + this.x + '-' + this.y + '-' + this.r + '-' + this.c);
            $circle.style.left = this.x + '%';
            $circle.style.top = this.y + '%';
            document.body.appendChild($circle);
        }
    }, {
        key: 'display',
        value: function display() {
            var $circle = document.querySelector('.circle-' + this.x + '-' + this.y + '-' + this.r + '-' + this.c);
            $circle.classList.add('shown');
        }
    }, {
        key: 'hide',
        value: function hide() {
            $circle.classList.remove('shown');
        }
    }]);

    return Circle;
}();

var circle_1 = new Circle(50, 50, 1, 1);
circle_1.create();
circle_1.display();

},{}],3:[function(require,module,exports){
'use strict';

var $frame = document.querySelector('.frame');
var $hours = $frame.querySelector('.hours');
var $minutes = $frame.querySelector('.minutes');
var $seconds = $frame.querySelector('.seconds');
var $posA = $frame.querySelector('.pos-a');
var $posO = $frame.querySelector('.pos-o');
var posA = 48.856614;
var posO = 2.287592000000018;

setInterval(function () {
    var date = new Date();
    $hours.textContent = date.getHours();
    $minutes.textContent = date.getMinutes();
    $seconds.textContent = date.getSeconds();

    var varA = (Math.floor(Math.random() * 1000) - 500) / 1000000;
    var varO = (Math.floor(Math.random() * 1000000000) - 500000000) / 1000000000000000;
    $posA.textContent = posA + varA;
    $posO.textContent = posO + varO;
}, 1000);

},{}],4:[function(require,module,exports){
'use strict';

var $frame = document.querySelector('.frame');
var $title = $frame.querySelector('.title');
var $slider = document.querySelector('.slider');
var $slides = Array.from($slider.querySelectorAll('.slide'));

var isScrolling = void 0;
var isScrolled = false;
var isPositive = true;
var deltaScroll = 0;
var move = void 0;
var blocs = void 0;
var row = 0;
var col = 0;

window.addEventListener('mousewheel', function (event) {
    // Update scrolling
    if (event.deltaY >= 0 != isPositive) {
        isPositive = !isPositive;
        deltaScroll = 0;
    }
    deltaScroll += event.deltaY;
    window.clearTimeout(isScrolling);

    // Prevent multiple scroll
    if (!isScrolled) {
        // Get active slide
        var $activeSlide = $slides.find(function ($slide) {
            return $slide.classList.contains('active');
        });
        var $blocs = Array.from($activeSlide.querySelectorAll('.bloc'));
        var $activeBloc = $blocs[row];
        blocs = $blocs.length;

        // Scroll down
        if (deltaScroll > 0) {
            // Below bloc
            if (row < blocs - 1) {
                slideDown($activeSlide, $activeBloc);
            }

            // Right slide
            else if (row == blocs - 1) {
                    slideRight($activeSlide, $activeBloc);
                }
        }

        // Scoll up
        else if (deltaScroll < 0) {
                // Uppon bloc
                if (row > 0) {
                    slideUp($activeSlide, $activeBloc);
                }

                // Left slide
                else if (row == 0) {
                        slideLeft($activeSlide, $activeBloc);
                    }
            }

        typeTitle();

        isScrolled = true;
        setTimeout(function () {
            isScrolled = false;
        }, 1500);
    }
});

var slideUp = function slideUp(currentSlide, currentBloc) {
    currentSlide.style.transform = 'translateY(-' + --row * window.innerHeight + 'px)';
    currentBloc.classList.remove('active');
    Array.from(currentSlide.querySelectorAll('.bloc'))[row].classList.add('active');
    move = 'up';
};

var slideDown = function slideDown(currentSlide, currentBloc) {
    currentSlide.style.transform = 'translateY(-' + ++row * 100 + '%)';
    currentBloc.classList.remove('active');
    Array.from(currentSlide.querySelectorAll('.bloc'))[row].classList.add('active');
    move = 'down';
};

var slideLeft = function slideLeft(currentSlide, currentBloc) {
    // Not first slide
    if (col > 0) {
        col--;
        row = Array.from($slides[col].querySelectorAll('.bloc')).length - 1;
        currentSlide.classList.remove('active');
        currentSlide.style.transform = 'translateX(100%)';
        $slides[col].classList.add('active');
        $slides[col].style.transform = 'translateX(0%) translateY(-' + row * 100 + '%)';
        currentBloc.classList.remove('active');
        Array.from($slides[col].querySelectorAll('.bloc'))[row].classList.add('active');
        move = 'left';
    }
};

var slideRight = function slideRight(currentSlide, currentBloc) {
    // Not last slide
    if (col < $slides.length - 1) {
        col++;
        currentSlide.classList.remove('active');
        currentSlide.style.transform = 'translateX(-100%) translateY(-' + row * 100 + '%)';
        $slides[col].classList.add('active');
        $slides[col].style.transform = 'translateX(0%)';
        row = 0;
        currentBloc.classList.remove('active');
        Array.from($slides[col].querySelectorAll('.bloc'))[row].classList.add('active');
        move = 'right';
    }
};

var typeTitle = function typeTitle() {
    if (row == 0 && col == 1 && move == 'right') {
        //$title.classList.add('hidden')
    } else if (row == 0 && col == 0) {
        //$title.classList.remove('hidden')
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY2lyY2xlcy5qcyIsInNyYy9qcy9jb21wb25lbnRzL2ZyYW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2xpZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7SUNGTSxNO0FBRUYsb0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFDQTtBQUFBOztBQUNJLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDSDs7OztpQ0FFRDtBQUNJLGdCQUFNLFVBQVUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0Esb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsYUFBZ0MsS0FBSyxDQUFyQyxTQUEwQyxLQUFLLENBQS9DLFNBQW9ELEtBQUssQ0FBekQsU0FBOEQsS0FBSyxDQUFuRTtBQUNBLG9CQUFRLEtBQVIsQ0FBYyxJQUFkLEdBQXdCLEtBQUssQ0FBN0I7QUFDQSxvQkFBUSxLQUFSLENBQWMsR0FBZCxHQUF1QixLQUFLLENBQTVCO0FBQ0EscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBMUI7QUFDSDs7O2tDQUVEO0FBQ0ksZ0JBQU0sVUFBVSxTQUFTLGFBQVQsY0FBa0MsS0FBSyxDQUF2QyxTQUE0QyxLQUFLLENBQWpELFNBQXNELEtBQUssQ0FBM0QsU0FBZ0UsS0FBSyxDQUFyRSxDQUFoQjtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsT0FBdEI7QUFDSDs7OytCQUVEO0FBQ0ksb0JBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixPQUF6QjtBQUNIOzs7Ozs7QUFHTCxJQUFNLFdBQVcsSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLEVBQWYsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBakI7QUFDQSxTQUFTLE1BQVQ7QUFDQSxTQUFTLE9BQVQ7Ozs7O0FDL0JBLElBQU0sU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLElBQU0sU0FBUyxPQUFPLGFBQVAsQ0FBcUIsUUFBckIsQ0FBZjtBQUNBLElBQU0sV0FBVyxPQUFPLGFBQVAsQ0FBcUIsVUFBckIsQ0FBakI7QUFDQSxJQUFNLFdBQVcsT0FBTyxhQUFQLENBQXFCLFVBQXJCLENBQWpCO0FBQ0EsSUFBTSxRQUFRLE9BQU8sYUFBUCxDQUFxQixRQUFyQixDQUFkO0FBQ0EsSUFBTSxRQUFRLE9BQU8sYUFBUCxDQUFxQixRQUFyQixDQUFkO0FBQ0EsSUFBTSxPQUFPLFNBQWI7QUFDQSxJQUFNLE9BQU8saUJBQWI7O0FBRUEsWUFBWSxZQUNaO0FBQ0ksUUFBTSxPQUFPLElBQUksSUFBSixFQUFiO0FBQ0EsV0FBTyxXQUFQLEdBQXFCLEtBQUssUUFBTCxFQUFyQjtBQUNBLGFBQVMsV0FBVCxHQUF1QixLQUFLLFVBQUwsRUFBdkI7QUFDQSxhQUFTLFdBQVQsR0FBdUIsS0FBSyxVQUFMLEVBQXZCOztBQUVBLFFBQU0sT0FBTyxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixJQUEzQixJQUFtQyxHQUFwQyxJQUEyQyxPQUF4RDtBQUNBLFFBQU0sT0FBTyxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixVQUEzQixJQUF5QyxTQUExQyxJQUF1RCxnQkFBcEU7QUFDQSxVQUFNLFdBQU4sR0FBb0IsT0FBTyxJQUEzQjtBQUNBLFVBQU0sV0FBTixHQUFvQixPQUFPLElBQTNCO0FBQ0gsQ0FYRCxFQVdHLElBWEg7Ozs7O0FDVEEsSUFBTSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsSUFBTSxTQUFTLE9BQU8sYUFBUCxDQUFxQixRQUFyQixDQUFmO0FBQ0EsSUFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFoQjtBQUNBLElBQU0sVUFBVSxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQVgsQ0FBaEI7O0FBRUEsSUFBSSxvQkFBSjtBQUNBLElBQUksYUFBYSxLQUFqQjtBQUNBLElBQUksYUFBYSxJQUFqQjtBQUNBLElBQUksY0FBYyxDQUFsQjtBQUNBLElBQUksYUFBSjtBQUNBLElBQUksY0FBSjtBQUNBLElBQUksTUFBTSxDQUFWO0FBQ0EsSUFBSSxNQUFNLENBQVY7O0FBRUEsT0FBTyxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxVQUFDLEtBQUQsRUFDdEM7QUFDSTtBQUNBLFFBQUssTUFBTSxNQUFOLElBQWdCLENBQWpCLElBQXVCLFVBQTNCLEVBQ0E7QUFDSSxxQkFBYSxDQUFDLFVBQWQ7QUFDQSxzQkFBYyxDQUFkO0FBQ0g7QUFDRCxtQkFBZSxNQUFNLE1BQXJCO0FBQ0EsV0FBTyxZQUFQLENBQW9CLFdBQXBCOztBQUVBO0FBQ0EsUUFBSSxDQUFDLFVBQUwsRUFDQTtBQUNJO0FBQ0EsWUFBTSxlQUFlLFFBQVEsSUFBUixDQUFhO0FBQUEsbUJBQVUsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLFFBQTFCLENBQVY7QUFBQSxTQUFiLENBQXJCO0FBQ0EsWUFBTSxTQUFTLE1BQU0sSUFBTixDQUFXLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsQ0FBWCxDQUFmO0FBQ0EsWUFBTSxjQUFjLE9BQU8sR0FBUCxDQUFwQjtBQUNBLGdCQUFRLE9BQU8sTUFBZjs7QUFFQTtBQUNBLFlBQUksY0FBYyxDQUFsQixFQUNBO0FBQ0k7QUFDQSxnQkFBSSxNQUFNLFFBQVEsQ0FBbEIsRUFDQTtBQUNJLDBCQUFVLFlBQVYsRUFBd0IsV0FBeEI7QUFDSDs7QUFFRDtBQUxBLGlCQU1LLElBQUksT0FBTyxRQUFRLENBQW5CLEVBQ0w7QUFDSSwrQkFBVyxZQUFYLEVBQXlCLFdBQXpCO0FBQ0g7QUFDSjs7QUFFRDtBQWZBLGFBZ0JLLElBQUksY0FBYyxDQUFsQixFQUNMO0FBQ0k7QUFDQSxvQkFBSSxNQUFNLENBQVYsRUFDQTtBQUNJLDRCQUFRLFlBQVIsRUFBc0IsV0FBdEI7QUFDSDs7QUFFRDtBQUxBLHFCQU1LLElBQUksT0FBTyxDQUFYLEVBQ0w7QUFDSSxrQ0FBVSxZQUFWLEVBQXdCLFdBQXhCO0FBQ0g7QUFDSjs7QUFFRDs7QUFFQSxxQkFBYSxJQUFiO0FBQ0EsbUJBQVcsWUFDWDtBQUNJLHlCQUFhLEtBQWI7QUFDSCxTQUhELEVBR0csSUFISDtBQUlIO0FBQ0osQ0E1REQ7O0FBOERBLElBQU0sVUFBVSxTQUFWLE9BQVUsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUNoQjtBQUNJLGlCQUFhLEtBQWIsQ0FBbUIsU0FBbkIsb0JBQThDLEVBQUUsR0FBRixHQUFRLE9BQU8sV0FBN0Q7QUFDQSxnQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLFFBQTdCO0FBQ0EsVUFBTSxJQUFOLENBQVcsYUFBYSxnQkFBYixDQUE4QixPQUE5QixDQUFYLEVBQW1ELEdBQW5ELEVBQXdELFNBQXhELENBQWtFLEdBQWxFLENBQXNFLFFBQXRFO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQ0FORDs7QUFRQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsWUFBRCxFQUFlLFdBQWYsRUFDbEI7QUFDSSxpQkFBYSxLQUFiLENBQW1CLFNBQW5CLG9CQUE4QyxFQUFFLEdBQUYsR0FBUSxHQUF0RDtBQUNBLGdCQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsUUFBN0I7QUFDQSxVQUFNLElBQU4sQ0FBVyxhQUFhLGdCQUFiLENBQThCLE9BQTlCLENBQVgsRUFBbUQsR0FBbkQsRUFBd0QsU0FBeEQsQ0FBa0UsR0FBbEUsQ0FBc0UsUUFBdEU7QUFDQSxXQUFPLE1BQVA7QUFDSCxDQU5EOztBQVFBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxZQUFELEVBQWUsV0FBZixFQUNsQjtBQUNJO0FBQ0EsUUFBSSxNQUFNLENBQVYsRUFDQTtBQUNJO0FBQ0EsY0FBTSxNQUFNLElBQU4sQ0FBVyxRQUFRLEdBQVIsRUFBYSxnQkFBYixDQUE4QixPQUE5QixDQUFYLEVBQW1ELE1BQW5ELEdBQTRELENBQWxFO0FBQ0EscUJBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixRQUE5QjtBQUNBLHFCQUFhLEtBQWIsQ0FBbUIsU0FBbkI7QUFDQSxnQkFBUSxHQUFSLEVBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixRQUEzQjtBQUNBLGdCQUFRLEdBQVIsRUFBYSxLQUFiLENBQW1CLFNBQW5CLG1DQUE2RCxNQUFNLEdBQW5FO0FBQ0Esb0JBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixRQUE3QjtBQUNBLGNBQU0sSUFBTixDQUFXLFFBQVEsR0FBUixFQUFhLGdCQUFiLENBQThCLE9BQTlCLENBQVgsRUFBbUQsR0FBbkQsRUFBd0QsU0FBeEQsQ0FBa0UsR0FBbEUsQ0FBc0UsUUFBdEU7QUFDQSxlQUFPLE1BQVA7QUFDSDtBQUNKLENBZkQ7O0FBaUJBLElBQU0sYUFBYSxTQUFiLFVBQWEsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUNuQjtBQUNJO0FBQ0EsUUFBSSxNQUFNLFFBQVEsTUFBUixHQUFpQixDQUEzQixFQUNBO0FBQ0k7QUFDQSxxQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLFFBQTlCO0FBQ0EscUJBQWEsS0FBYixDQUFtQixTQUFuQixzQ0FBZ0UsTUFBTSxHQUF0RTtBQUNBLGdCQUFRLEdBQVIsRUFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCO0FBQ0EsZ0JBQVEsR0FBUixFQUFhLEtBQWIsQ0FBbUIsU0FBbkI7QUFDQSxjQUFNLENBQU47QUFDQSxvQkFBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLFFBQTdCO0FBQ0EsY0FBTSxJQUFOLENBQVcsUUFBUSxHQUFSLEVBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsQ0FBWCxFQUFtRCxHQUFuRCxFQUF3RCxTQUF4RCxDQUFrRSxHQUFsRSxDQUFzRSxRQUF0RTtBQUNBLGVBQU8sT0FBUDtBQUNIO0FBQ0osQ0FmRDs7QUFpQkEsSUFBTSxZQUFZLFNBQVosU0FBWSxHQUNsQjtBQUNJLFFBQUksT0FBTyxDQUFQLElBQVksT0FBTyxDQUFuQixJQUF3QixRQUFRLE9BQXBDLEVBQ0E7QUFDSTtBQUNILEtBSEQsTUFJSyxJQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBdkIsRUFDTDtBQUNJO0FBQ0g7QUFDSixDQVZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBmcmFtZSBmcm9tICcuL2NvbXBvbmVudHMvZnJhbWUuanMnXG5pbXBvcnQgc2xpZGVzIGZyb20gJy4vY29tcG9uZW50cy9zbGlkZXMuanMnXG5pbXBvcnQgY2lyY2xlcyBmcm9tICcuL2NvbXBvbmVudHMvY2lyY2xlcy5qcyciLCJjbGFzcyBDaXJjbGVcbntcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCByLCBjKVxuICAgIHtcbiAgICAgICAgdGhpcy54ID0geFxuICAgICAgICB0aGlzLnkgPSB5XG4gICAgICAgIHRoaXMuciA9IHJcbiAgICAgICAgdGhpcy5jID0gY1xuICAgIH1cbiAgICBjcmVhdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgJGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlJylcbiAgICAgICAgJGNpcmNsZS5jbGFzc0xpc3QuYWRkKGBjaXJjbGUtJHt0aGlzLnh9LSR7dGhpcy55fS0ke3RoaXMucn0tJHt0aGlzLmN9YClcbiAgICAgICAgJGNpcmNsZS5zdHlsZS5sZWZ0ID0gYCR7dGhpcy54fSVgXG4gICAgICAgICRjaXJjbGUuc3R5bGUudG9wID0gYCR7dGhpcy55fSVgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJGNpcmNsZSlcbiAgICB9XG4gICAgZGlzcGxheSgpXG4gICAge1xuICAgICAgICBjb25zdCAkY2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNpcmNsZS0ke3RoaXMueH0tJHt0aGlzLnl9LSR7dGhpcy5yfS0ke3RoaXMuY31gKVxuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC5hZGQoJ3Nob3duJylcbiAgICB9XG4gICAgaGlkZSgpXG4gICAge1xuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJylcbiAgICB9XG59XG5cbmNvbnN0IGNpcmNsZV8xID0gbmV3IENpcmNsZSg1MCwgNTAsIDEsIDEpXG5jaXJjbGVfMS5jcmVhdGUoKVxuY2lyY2xlXzEuZGlzcGxheSgpIiwiY29uc3QgJGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyYW1lJylcbmNvbnN0ICRob3VycyA9ICRmcmFtZS5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKVxuY29uc3QgJG1pbnV0ZXMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLm1pbnV0ZXMnKVxuY29uc3QgJHNlY29uZHMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnNlY29uZHMnKVxuY29uc3QgJHBvc0EgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnBvcy1hJylcbmNvbnN0ICRwb3NPID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5wb3MtbycpXG5jb25zdCBwb3NBID0gNDguODU2NjE0XG5jb25zdCBwb3NPID0gMi4yODc1OTIwMDAwMDAwMThcblxuc2V0SW50ZXJ2YWwoKCkgPT5cbntcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgICRob3Vycy50ZXh0Q29udGVudCA9IGRhdGUuZ2V0SG91cnMoKVxuICAgICRtaW51dGVzLnRleHRDb250ZW50ID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAkc2Vjb25kcy50ZXh0Q29udGVudCA9IGRhdGUuZ2V0U2Vjb25kcygpXG5cbiAgICBjb25zdCB2YXJBID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApIC0gNTAwKSAvIDEwMDAwMDBcbiAgICBjb25zdCB2YXJPID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApIC0gNTAwMDAwMDAwKSAvIDEwMDAwMDAwMDAwMDAwMDBcbiAgICAkcG9zQS50ZXh0Q29udGVudCA9IHBvc0EgKyB2YXJBXG4gICAgJHBvc08udGV4dENvbnRlbnQgPSBwb3NPICsgdmFyT1xufSwgMTAwMCkiLCJjb25zdCAkZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJhbWUnKVxuY29uc3QgJHRpdGxlID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpXG5jb25zdCAkc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpXG5jb25zdCAkc2xpZGVzID0gQXJyYXkuZnJvbSgkc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKVxuXG5sZXQgaXNTY3JvbGxpbmdcbmxldCBpc1Njcm9sbGVkID0gZmFsc2VcbmxldCBpc1Bvc2l0aXZlID0gdHJ1ZVxubGV0IGRlbHRhU2Nyb2xsID0gMFxubGV0IG1vdmVcbmxldCBibG9jc1xubGV0IHJvdyA9IDBcbmxldCBjb2wgPSAwXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKGV2ZW50KSA9Plxue1xuICAgIC8vIFVwZGF0ZSBzY3JvbGxpbmdcbiAgICBpZiAoKGV2ZW50LmRlbHRhWSA+PSAwKSAhPSBpc1Bvc2l0aXZlKVxuICAgIHtcbiAgICAgICAgaXNQb3NpdGl2ZSA9ICFpc1Bvc2l0aXZlXG4gICAgICAgIGRlbHRhU2Nyb2xsID0gMFxuICAgIH1cbiAgICBkZWx0YVNjcm9sbCArPSBldmVudC5kZWx0YVlcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGlzU2Nyb2xsaW5nKVxuXG4gICAgLy8gUHJldmVudCBtdWx0aXBsZSBzY3JvbGxcbiAgICBpZiAoIWlzU2Nyb2xsZWQpXG4gICAge1xuICAgICAgICAvLyBHZXQgYWN0aXZlIHNsaWRlXG4gICAgICAgIGNvbnN0ICRhY3RpdmVTbGlkZSA9ICRzbGlkZXMuZmluZCgkc2xpZGUgPT4gJHNsaWRlLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpXG4gICAgICAgIGNvbnN0ICRibG9jcyA9IEFycmF5LmZyb20oJGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpXG4gICAgICAgIGNvbnN0ICRhY3RpdmVCbG9jID0gJGJsb2NzW3Jvd11cbiAgICAgICAgYmxvY3MgPSAkYmxvY3MubGVuZ3RoXG5cbiAgICAgICAgLy8gU2Nyb2xsIGRvd25cbiAgICAgICAgaWYgKGRlbHRhU2Nyb2xsID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQmVsb3cgYmxvY1xuICAgICAgICAgICAgaWYgKHJvdyA8IGJsb2NzIC0gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZURvd24oJGFjdGl2ZVNsaWRlLCAkYWN0aXZlQmxvYylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmlnaHQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdyA9PSBibG9jcyAtIDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVSaWdodCgkYWN0aXZlU2xpZGUsICRhY3RpdmVCbG9jKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2NvbGwgdXBcbiAgICAgICAgZWxzZSBpZiAoZGVsdGFTY3JvbGwgPCAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBVcHBvbiBibG9jXG4gICAgICAgICAgICBpZiAocm93ID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZVVwKCRhY3RpdmVTbGlkZSwgJGFjdGl2ZUJsb2MpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExlZnQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdyA9PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNsaWRlTGVmdCgkYWN0aXZlU2xpZGUsICRhY3RpdmVCbG9jKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHlwZVRpdGxlKClcblxuICAgICAgICBpc1Njcm9sbGVkID0gdHJ1ZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlzU2Nyb2xsZWQgPSBmYWxzZVxuICAgICAgICB9LCAxNTAwKVxuICAgIH1cbn0pXG5cbmNvbnN0IHNsaWRlVXAgPSAoY3VycmVudFNsaWRlLCBjdXJyZW50QmxvYykgPT5cbntcbiAgICBjdXJyZW50U2xpZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7LS1yb3cgKiB3aW5kb3cuaW5uZXJIZWlnaHR9cHgpYFxuICAgIGN1cnJlbnRCbG9jLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgQXJyYXkuZnJvbShjdXJyZW50U2xpZGUucXVlcnlTZWxlY3RvckFsbCgnLmJsb2MnKSlbcm93XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIG1vdmUgPSAndXAnXG59XG5cbmNvbnN0IHNsaWRlRG93biA9IChjdXJyZW50U2xpZGUsIGN1cnJlbnRCbG9jKSA9Plxue1xuICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHsrK3JvdyAqIDEwMH0lKWBcbiAgICBjdXJyZW50QmxvYy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgIEFycmF5LmZyb20oY3VycmVudFNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpW3Jvd10uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICBtb3ZlID0gJ2Rvd24nXG59XG5cbmNvbnN0IHNsaWRlTGVmdCA9IChjdXJyZW50U2xpZGUsIGN1cnJlbnRCbG9jKSA9Plxue1xuICAgIC8vIE5vdCBmaXJzdCBzbGlkZVxuICAgIGlmIChjb2wgPiAwKVxuICAgIHtcbiAgICAgICAgY29sLS1cbiAgICAgICAgcm93ID0gQXJyYXkuZnJvbSgkc2xpZGVzW2NvbF0ucXVlcnlTZWxlY3RvckFsbCgnLmJsb2MnKSkubGVuZ3RoIC0gMVxuICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDEwMCUpYFxuICAgICAgICAkc2xpZGVzW2NvbF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgJHNsaWRlc1tjb2xdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDAlKSB0cmFuc2xhdGVZKC0ke3JvdyAqIDEwMH0lKWBcbiAgICAgICAgY3VycmVudEJsb2MuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgQXJyYXkuZnJvbSgkc2xpZGVzW2NvbF0ucXVlcnlTZWxlY3RvckFsbCgnLmJsb2MnKSlbcm93XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICBtb3ZlID0gJ2xlZnQnXG4gICAgfVxufVxuXG5jb25zdCBzbGlkZVJpZ2h0ID0gKGN1cnJlbnRTbGlkZSwgY3VycmVudEJsb2MpID0+XG57XG4gICAgLy8gTm90IGxhc3Qgc2xpZGVcbiAgICBpZiAoY29sIDwgJHNsaWRlcy5sZW5ndGggLSAxKVxuICAgIHtcbiAgICAgICAgY29sKytcbiAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtMTAwJSkgdHJhbnNsYXRlWSgtJHtyb3cgKiAxMDB9JSlgXG4gICAgICAgICRzbGlkZXNbY29sXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAkc2xpZGVzW2NvbF0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMCUpYFxuICAgICAgICByb3cgPSAwXG4gICAgICAgIGN1cnJlbnRCbG9jLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIEFycmF5LmZyb20oJHNsaWRlc1tjb2xdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpW3Jvd10uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgbW92ZSA9ICdyaWdodCdcbiAgICB9XG59XG5cbmNvbnN0IHR5cGVUaXRsZSA9ICgpID0+XG57XG4gICAgaWYgKHJvdyA9PSAwICYmIGNvbCA9PSAxICYmIG1vdmUgPT0gJ3JpZ2h0JylcbiAgICB7XG4gICAgICAgIC8vJHRpdGxlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfVxuICAgIGVsc2UgaWYgKHJvdyA9PSAwICYmIGNvbCA9PSAwKVxuICAgIHtcbiAgICAgICAgLy8kdGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICB9XG59Il19
