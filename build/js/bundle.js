(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _frame = require('./components/frame.js');

var _frame2 = _interopRequireDefault(_frame);

var _slides = require('./components/slides.js');

var _slides2 = _interopRequireDefault(_slides);

var _circles = require('./components/circles.js');

var _circles2 = _interopRequireDefault(_circles);

var _music = require('./components/music.js');

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./components/circles.js":2,"./components/frame.js":3,"./components/music.js":4,"./components/slides.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(x, y, r, c, t) {
        _classCallCheck(this, Circle);

        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.t = t;
    }

    _createClass(Circle, [{
        key: 'create',
        value: function create() {
            // Set circle
            var $circle = document.createElement('div');
            $circle.classList.add('circle');
            $circle.classList.add('circle-' + this.x + '-' + this.y + '-' + this.r + '-' + this.c);
            $circle.style.left = this.x + '%';
            $circle.style.top = this.y + '%';

            // Set components
            var $stick_1 = document.createElement('div');
            var $stick_2 = document.createElement('div');
            var $text = document.createElement('p');
            $stick_1.classList.add('stick-1');
            $stick_2.classList.add('stick-2');
            $text.classList.add('text');
            $text.textContent = this.t;

            // Add circle
            $stick_2.appendChild($text);
            $stick_1.appendChild($stick_2);
            $circle.appendChild($stick_1);
            document.body.appendChild($circle);

            // Detect mouse move
            var posX = $circle.offsetLeft + $circle.offsetWidth / 2;
            var posY = $circle.offsetTop + $circle.offsetHeight / 2;
            var posCircle = { x: posX, y: posY };
            window.addEventListener('mousemove', function (event) {
                var deltaX = event.clientX - posX;
                var deltaY = event.clientY - posY;
                if (Math.abs(deltaX) <= $circle.offsetWidth * 2.5 && Math.abs(deltaY) <= $circle.offsetHeight * 2.5) {
                    $circle.style.transform = 'scale(1.25) translate(' + deltaX * 0.125 + 'px, ' + deltaY * 0.125 + 'px)';
                } else {
                    $circle.style.transform = 'scale(1) translate(0)';
                }
            });
        }
    }, {
        key: 'display',
        value: function display() {
            var $circle = document.querySelector('.circle-' + this.x + '-' + this.y + '-' + this.r + '-' + this.c);
            $circle.classList.toggle('shown');
        }
    }, {
        key: 'hide',
        value: function hide() {
            var $circle = document.querySelector('.circle-' + this.x + '-' + this.y + '-' + this.r + '-' + this.c);
            $circle.classList.remove('shown');
        }
    }]);

    return Circle;
}();

exports.default = Circle;

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

var _slides = require('./slides.js');

var _slides2 = _interopRequireDefault(_slides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $slides = Array.from(document.querySelectorAll('.slide'));
var $activeSlide = $slides.find(function (slide) {
  return slide.classList.contains('active');
});

window.addEventListener('click', _slides2.default);

},{"./slides.js":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _circles = require('./circles.js');

var _circles2 = _interopRequireDefault(_circles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $slider = document.querySelector('.slider');
var $slides = Array.from($slider.querySelectorAll('.slide'));

var isScrolling = void 0;
var isScrolled = false;
var isPositive = true;
var deltaScroll = 0;
var blocs = void 0;
var floor = 0;
var step = 0;

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
        var $activeBloc = $blocs.find(function ($bloc) {
            return $bloc.classList.contains('active');
        });
        blocs = $blocs.length;
        step = $slides.indexOf($activeSlide);

        // Scroll down
        if (deltaScroll > 0) {
            // Below bloc
            if (floor < blocs - 1) {
                slideDown($activeSlide);
            }

            // Right slide
            else if (floor == blocs - 1) {
                    slideRight($activeSlide);
                }
        }

        // Scoll up
        else if (deltaScroll < 0) {
                // Uppon bloc
                if (floor > 0) {
                    slideUp($activeSlide);
                }

                // Left slide
                else if (floor == 0) {
                        slideLeft($activeSlide);
                    }
            }

        isScrolled = true;
        setTimeout(function () {
            isScrolled = false;
        }, 1500);
    }
});

var slideUp = function slideUp(currentSlide) {
    currentSlide.style.transform = 'translateY(-' + --floor * window.innerHeight + 'px)';
};

var slideDown = function slideDown(currentSlide) {
    currentSlide.style.transform = 'translateY(-' + ++floor * 100 + '%)';
};

var slideLeft = function slideLeft(currentSlide) {
    // Not first slide
    if (step > 0) {
        floor = Array.from($slides[step - 1].querySelectorAll('.bloc')).length - 1;
        currentSlide.classList.remove('active');
        currentSlide.style.transform = 'translateX(100%)';
        $slides[step - 1].classList.add('active');
        $slides[step - 1].style.transform = 'translateX(0%) translateY(-' + floor * 100 + '%)';
    }
};

var slideRight = function slideRight(currentSlide) {
    // Not last slide
    if (step < $slides.length - 1) {
        currentSlide.classList.remove('active');
        currentSlide.style.transform = 'translateX(-100%) translateY(-' + floor * 100 + '%)';
        $slides[step + 1].classList.add('active');
        $slides[step + 1].style.transform = 'translateX(0%)';
        floor = 0;
    }
};

var t11 = 'According to plans unveiled in September 2016, the first flight to Mars would take place in 2024. The project, which would be developed thanks to the profits made by SpaceX and the personal wealth of its founder Elon Musk, will eventually lead to the establishment of a permanent colony on Mars.';
var c11 = new _circles2.default(50, 50, 1, 1, t11);
c11.create();
c11.display();

exports.default = slideUp;

},{"./circles.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY2lyY2xlcy5qcyIsInNyYy9qcy9jb21wb25lbnRzL2ZyYW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbXVzaWMuanMiLCJzcmMvanMvY29tcG9uZW50cy9zbGlkZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0hNLE07QUFFRixvQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUNBO0FBQUE7O0FBQ0ksYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDSDs7OztpQ0FFRDtBQUNJO0FBQ0EsZ0JBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFFBQXRCO0FBQ0Esb0JBQVEsU0FBUixDQUFrQixHQUFsQixhQUFnQyxLQUFLLENBQXJDLFNBQTBDLEtBQUssQ0FBL0MsU0FBb0QsS0FBSyxDQUF6RCxTQUE4RCxLQUFLLENBQW5FO0FBQ0Esb0JBQVEsS0FBUixDQUFjLElBQWQsR0FBd0IsS0FBSyxDQUE3QjtBQUNBLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLEdBQXVCLEtBQUssQ0FBNUI7O0FBRUE7QUFDQSxnQkFBTSxXQUFXLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLGdCQUFNLFdBQVcsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsZ0JBQU0sUUFBUSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FB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QyxPQUFuQyxDQUFYLEVBQXdELE1BQXhELEdBQWlFLENBQXpFO0FBQ0EscUJBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixRQUE5QjtBQUNBLHFCQUFhLEtBQWIsQ0FBbUIsU0FBbkI7QUFDQSxnQkFBUSxPQUFPLENBQWYsRUFBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsUUFBaEM7QUFDQSxnQkFBUSxPQUFPLENBQWYsRUFBa0IsS0FBbEIsQ0FBd0IsU0FBeEIsbUNBQWtFLFFBQVEsR0FBMUU7QUFDSDtBQUNKLENBWEQ7O0FBYUEsSUFBTSxhQUFhLFNBQWIsVUFBYSxDQUFDLFlBQUQsRUFDbkI7QUFDSTtBQUNBLFFBQUksT0FBTyxRQUFRLE1BQVIsR0FBaUIsQ0FBNUIsRUFDQTtBQUNJLHFCQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsUUFBOUI7QUFDQSxxQkFBYSxLQUFiLENBQW1CLFNBQW5CLHNDQUFnRSxRQUFRLEdBQXhFO0FBQ0EsZ0JBQVEsT0FBTyxDQUFmLEVBQWtCLFNBQWxCLENBQTRCLEdBQTVCLENBQWdDLFFBQWhDO0FBQ0EsZ0JBQVEsT0FBTyxDQUFmLEVBQWtCLEtBQWxCLENBQXdCLFNBQXhCO0FBQ0EsZ0JBQVEsQ0FBUjtBQUNIO0FBQ0osQ0FYRDs7QUFlQSxJQUFNLE1BQU0seVNBQVo7QUFDQSxJQUFNLE1BQU0sc0JBQVcsRUFBWCxFQUFlLEVBQWYsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsR0FBekIsQ0FBWjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksT0FBSjs7a0JBRWUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZnJhbWUgZnJvbSAnLi9jb21wb25lbnRzL2ZyYW1lLmpzJ1xuaW1wb3J0IHNsaWRlcyBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGVzLmpzJ1xuaW1wb3J0IGNpcmNsZXMgZnJvbSAnLi9jb21wb25lbnRzL2NpcmNsZXMuanMnXG5pbXBvcnQgbXVzaWMgZnJvbSAnLi9jb21wb25lbnRzL211c2ljLmpzJyIsImNsYXNzIENpcmNsZVxue1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHIsIGMsIHQpXG4gICAge1xuICAgICAgICB0aGlzLnggPSB4XG4gICAgICAgIHRoaXMueSA9IHlcbiAgICAgICAgdGhpcy5yID0gclxuICAgICAgICB0aGlzLmMgPSBjXG4gICAgICAgIHRoaXMudCA9IHRcbiAgICB9XG4gICAgY3JlYXRlKClcbiAgICB7XG4gICAgICAgIC8vIFNldCBjaXJjbGVcbiAgICAgICAgY29uc3QgJGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlJylcbiAgICAgICAgJGNpcmNsZS5jbGFzc0xpc3QuYWRkKGBjaXJjbGUtJHt0aGlzLnh9LSR7dGhpcy55fS0ke3RoaXMucn0tJHt0aGlzLmN9YClcbiAgICAgICAgJGNpcmNsZS5zdHlsZS5sZWZ0ID0gYCR7dGhpcy54fSVgXG4gICAgICAgICRjaXJjbGUuc3R5bGUudG9wID0gYCR7dGhpcy55fSVgXG5cbiAgICAgICAgLy8gU2V0IGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgJHN0aWNrXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCAkc3RpY2tfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0ICR0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICRzdGlja18xLmNsYXNzTGlzdC5hZGQoJ3N0aWNrLTEnKVxuICAgICAgICAkc3RpY2tfMi5jbGFzc0xpc3QuYWRkKCdzdGljay0yJylcbiAgICAgICAgJHRleHQuY2xhc3NMaXN0LmFkZCgndGV4dCcpXG4gICAgICAgICR0ZXh0LnRleHRDb250ZW50ID0gdGhpcy50XG5cbiAgICAgICAgLy8gQWRkIGNpcmNsZVxuICAgICAgICAkc3RpY2tfMi5hcHBlbmRDaGlsZCgkdGV4dClcbiAgICAgICAgJHN0aWNrXzEuYXBwZW5kQ2hpbGQoJHN0aWNrXzIpXG4gICAgICAgICRjaXJjbGUuYXBwZW5kQ2hpbGQoJHN0aWNrXzEpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJGNpcmNsZSlcblxuICAgICAgICAvLyBEZXRlY3QgbW91c2UgbW92ZVxuICAgICAgICBjb25zdCBwb3NYID0gJGNpcmNsZS5vZmZzZXRMZWZ0ICsgJGNpcmNsZS5vZmZzZXRXaWR0aCAvIDJcbiAgICAgICAgY29uc3QgcG9zWSA9ICRjaXJjbGUub2Zmc2V0VG9wICsgJGNpcmNsZS5vZmZzZXRIZWlnaHQgLyAyXG4gICAgICAgIGNvbnN0IHBvc0NpcmNsZSA9IHsgeDogcG9zWCwgeTogcG9zWSB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWCA9IGV2ZW50LmNsaWVudFggLSBwb3NYXG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSBldmVudC5jbGllbnRZIC0gcG9zWVxuICAgICAgICAgICAgaWZcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhkZWx0YVgpIDw9ICRjaXJjbGUub2Zmc2V0V2lkdGggKiAyLjUgJiZcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhkZWx0YVkpIDw9ICRjaXJjbGUub2Zmc2V0SGVpZ2h0ICogMi41XG4gICAgICAgICAgICApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJGNpcmNsZS5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoMS4yNSkgdHJhbnNsYXRlKCR7ZGVsdGFYICogMC4xMjV9cHgsICR7ZGVsdGFZICogMC4xMjV9cHgpYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICRjaXJjbGUuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKDEpIHRyYW5zbGF0ZSgwKWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgZGlzcGxheSgpXG4gICAge1xuICAgICAgICBjb25zdCAkY2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNpcmNsZS0ke3RoaXMueH0tJHt0aGlzLnl9LSR7dGhpcy5yfS0ke3RoaXMuY31gKVxuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3duJylcbiAgICB9XG4gICAgaGlkZSgpXG4gICAge1xuICAgICAgICBjb25zdCAkY2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNpcmNsZS0ke3RoaXMueH0tJHt0aGlzLnl9LSR7dGhpcy5yfS0ke3RoaXMuY31gKVxuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJylcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENpcmNsZSIsImNvbnN0ICRmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmFtZScpXG5jb25zdCAkaG91cnMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLmhvdXJzJylcbmNvbnN0ICRtaW51dGVzID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5taW51dGVzJylcbmNvbnN0ICRzZWNvbmRzID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRzJylcbmNvbnN0ICRwb3NBID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5wb3MtYScpXG5jb25zdCAkcG9zTyA9ICRmcmFtZS5xdWVyeVNlbGVjdG9yKCcucG9zLW8nKVxuY29uc3QgcG9zQSA9IDQ4Ljg1NjYxNFxuY29uc3QgcG9zTyA9IDIuMjg3NTkyMDAwMDAwMDE4XG4gXG5zZXRJbnRlcnZhbCgoKSA9Plxue1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgJGhvdXJzLnRleHRDb250ZW50ID0gZGF0ZS5nZXRIb3VycygpXG4gICAgJG1pbnV0ZXMudGV4dENvbnRlbnQgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICRzZWNvbmRzLnRleHRDb250ZW50ID0gZGF0ZS5nZXRTZWNvbmRzKClcbiBcbiAgICBjb25zdCB2YXJBID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApIC0gNTAwKSAvIDEwMDAwMDBcbiAgICBjb25zdCB2YXJPID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApIC0gNTAwMDAwMDAwKSAvIDEwMDAwMDAwMDAwMDAwMDBcbiAgICAkcG9zQS50ZXh0Q29udGVudCA9IHBvc0EgKyB2YXJBXG4gICAgJHBvc08udGV4dENvbnRlbnQgPSBwb3NPICsgdmFyT1xufSwgMTAwMCkiLCJpbXBvcnQgc2xpZGVSaWdodCBmcm9tICcuL3NsaWRlcy5qcydcblxuY29uc3QgJHNsaWRlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpXG5jb25zdCAkYWN0aXZlU2xpZGUgPSAkc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2xpZGVSaWdodCkiLCJjb25zdCAkc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpXG5jb25zdCAkc2xpZGVzID0gQXJyYXkuZnJvbSgkc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKVxuXG5sZXQgaXNTY3JvbGxpbmdcbmxldCBpc1Njcm9sbGVkID0gZmFsc2VcbmxldCBpc1Bvc2l0aXZlID0gdHJ1ZVxubGV0IGRlbHRhU2Nyb2xsID0gMFxubGV0IGJsb2NzXG5sZXQgZmxvb3IgPSAwXG5sZXQgc3RlcCA9IDBcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoZXZlbnQpID0+XG57XG4gICAgLy8gVXBkYXRlIHNjcm9sbGluZ1xuICAgIGlmICgoZXZlbnQuZGVsdGFZID49IDApICE9IGlzUG9zaXRpdmUpXG4gICAge1xuICAgICAgICBpc1Bvc2l0aXZlID0gIWlzUG9zaXRpdmVcbiAgICAgICAgZGVsdGFTY3JvbGwgPSAwXG4gICAgfVxuICAgIGRlbHRhU2Nyb2xsICs9IGV2ZW50LmRlbHRhWVxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaXNTY3JvbGxpbmcpXG5cbiAgICAvLyBQcmV2ZW50IG11bHRpcGxlIHNjcm9sbFxuICAgIGlmICghaXNTY3JvbGxlZClcbiAgICB7XG4gICAgICAgIC8vIEdldCBhY3RpdmUgc2xpZGVcbiAgICAgICAgY29uc3QgJGFjdGl2ZVNsaWRlID0gJHNsaWRlcy5maW5kKCRzbGlkZSA9PiAkc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcbiAgICAgICAgY29uc3QgJGJsb2NzID0gQXJyYXkuZnJvbSgkYWN0aXZlU2xpZGUucXVlcnlTZWxlY3RvckFsbCgnLmJsb2MnKSlcbiAgICAgICAgY29uc3QgJGFjdGl2ZUJsb2MgPSAkYmxvY3MuZmluZCgkYmxvYyA9PiAkYmxvYy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKVxuICAgICAgICBibG9jcyA9ICRibG9jcy5sZW5ndGhcbiAgICAgICAgc3RlcCA9ICRzbGlkZXMuaW5kZXhPZigkYWN0aXZlU2xpZGUpXG5cbiAgICAgICAgLy8gU2Nyb2xsIGRvd25cbiAgICAgICAgaWYgKGRlbHRhU2Nyb2xsID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQmVsb3cgYmxvY1xuICAgICAgICAgICAgaWYgKGZsb29yIDwgYmxvY3MgLSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNsaWRlRG93bigkYWN0aXZlU2xpZGUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJpZ2h0IHNsaWRlXG4gICAgICAgICAgICBlbHNlIGlmIChmbG9vciA9PSBibG9jcyAtIDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVSaWdodCgkYWN0aXZlU2xpZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTY29sbCB1cFxuICAgICAgICBlbHNlIGlmIChkZWx0YVNjcm9sbCA8IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFVwcG9uIGJsb2NcbiAgICAgICAgICAgIGlmIChmbG9vciA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVVcCgkYWN0aXZlU2xpZGUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExlZnQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKGZsb29yID09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVMZWZ0KCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlzU2Nyb2xsZWQgPSB0cnVlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaXNTY3JvbGxlZCA9IGZhbHNlXG4gICAgICAgIH0sIDE1MDApXG4gICAgfVxufSlcblxuY29uc3Qgc2xpZGVVcCA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0key0tZmxvb3IgKiB3aW5kb3cuaW5uZXJIZWlnaHR9cHgpYFxufVxuXG5jb25zdCBzbGlkZURvd24gPSAoY3VycmVudFNsaWRlKSA9Plxue1xuICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHsrK2Zsb29yICogMTAwfSUpYFxufVxuXG5jb25zdCBzbGlkZUxlZnQgPSAoY3VycmVudFNsaWRlKSA9Plxue1xuICAgIC8vIE5vdCBmaXJzdCBzbGlkZVxuICAgIGlmIChzdGVwID4gMClcbiAgICB7XG4gICAgICAgIGZsb29yID0gQXJyYXkuZnJvbSgkc2xpZGVzW3N0ZXAgLSAxXS5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvYycpKS5sZW5ndGggLSAxXG4gICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBjdXJyZW50U2xpZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMTAwJSlgXG4gICAgICAgICRzbGlkZXNbc3RlcCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICRzbGlkZXNbc3RlcCAtIDFdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDAlKSB0cmFuc2xhdGVZKC0ke2Zsb29yICogMTAwfSUpYFxuICAgIH1cbn1cblxuY29uc3Qgc2xpZGVSaWdodCA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgLy8gTm90IGxhc3Qgc2xpZGVcbiAgICBpZiAoc3RlcCA8ICRzbGlkZXMubGVuZ3RoIC0gMSlcbiAgICB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBjdXJyZW50U2xpZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLTEwMCUpIHRyYW5zbGF0ZVkoLSR7Zmxvb3IgKiAxMDB9JSlgXG4gICAgICAgICRzbGlkZXNbc3RlcCArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICRzbGlkZXNbc3RlcCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDAlKWBcbiAgICAgICAgZmxvb3IgPSAwXG4gICAgfVxufVxuXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vY2lyY2xlcy5qcydcblxuY29uc3QgdDExID0gJ0FjY29yZGluZyB0byBwbGFucyB1bnZlaWxlZCBpbiBTZXB0ZW1iZXIgMjAxNiwgdGhlIGZpcnN0IGZsaWdodCB0byBNYXJzIHdvdWxkIHRha2UgcGxhY2UgaW4gMjAyNC4gVGhlIHByb2plY3QsIHdoaWNoIHdvdWxkIGJlIGRldmVsb3BlZCB0aGFua3MgdG8gdGhlIHByb2ZpdHMgbWFkZSBieSBTcGFjZVggYW5kIHRoZSBwZXJzb25hbCB3ZWFsdGggb2YgaXRzIGZvdW5kZXIgRWxvbiBNdXNrLCB3aWxsIGV2ZW50dWFsbHkgbGVhZCB0byB0aGUgZXN0YWJsaXNobWVudCBvZiBhIHBlcm1hbmVudCBjb2xvbnkgb24gTWFycy4nXG5jb25zdCBjMTEgPSBuZXcgQ2lyY2xlKDUwLCA1MCwgMSwgMSwgdDExKVxuYzExLmNyZWF0ZSgpXG5jMTEuZGlzcGxheSgpXG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlVXAiXX0=
