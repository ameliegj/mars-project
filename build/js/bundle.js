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

},{"./circles.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY2lyY2xlcy5qcyIsInNyYy9qcy9jb21wb25lbnRzL2ZyYW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2xpZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRk0sTTtBQUVGLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNIOzs7O2lDQUVEO0FBQ0k7QUFDQSxnQkFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsUUFBdEI7QUFDQSxvQkFBUSxTQUFSLENBQWtCLEdBQWxCLGFBQWdDLEtBQUssQ0FBckMsU0FBMEMsS0FBSyxDQUEvQyxTQUFvRCxLQUFLLENBQXpELFNBQThELEtBQUssQ0FBbkU7QUFDQSxvQkFBUSxLQUFSLENBQWMsSUFBZCxHQUF3QixLQUFLLENBQTdCO0FBQ0Esb0JBQVEsS0FBUixDQUFjLEdBQWQsR0FBdUIsS0FBSyxDQUE1Qjs7QUFFQTtBQUNBLGdCQUFNLFdBQVcsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsZ0JBQU0sV0FBVyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQSxnQkFBTSxRQUFRLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0EscUJBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixT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YUEsSUFBTSxhQUFhLFNBQWIsVUFBYSxDQUFDLFlBQUQsRUFDbkI7QUFDSTtBQUNBLFFBQUksT0FBTyxRQUFRLE1BQVIsR0FBaUIsQ0FBNUIsRUFDQTtBQUNJLHFCQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsUUFBOUI7QUFDQSxxQkFBYSxLQUFiLENBQW1CLFNBQW5CLHNDQUFnRSxRQUFRLEdBQXhFO0FBQ0EsZ0JBQVEsT0FBTyxDQUFmLEVBQWtCLFNBQWxCLENBQTRCLEdBQTVCLENBQWdDLFFBQWhDO0FBQ0EsZ0JBQVEsT0FBTyxDQUFmLEVBQWtCLEtBQWxCLENBQXdCLFNBQXhCO0FBQ0EsZ0JBQVEsQ0FBUjtBQUNIO0FBQ0osQ0FYRDs7QUFlQSxJQUFNLE1BQU0seVNBQVo7QUFDQSxJQUFNLE1BQU0sc0JBQVcsRUFBWCxFQUFlLEVBQWYsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsR0FBekIsQ0FBWjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksT0FBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZnJhbWUgZnJvbSAnLi9jb21wb25lbnRzL2ZyYW1lLmpzJ1xuaW1wb3J0IHNsaWRlcyBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGVzLmpzJ1xuaW1wb3J0IGNpcmNsZXMgZnJvbSAnLi9jb21wb25lbnRzL2NpcmNsZXMuanMnIiwiY2xhc3MgQ2lyY2xlXG57XG4gICAgY29uc3RydWN0b3IoeCwgeSwgciwgYywgdClcbiAgICB7XG4gICAgICAgIHRoaXMueCA9IHhcbiAgICAgICAgdGhpcy55ID0geVxuICAgICAgICB0aGlzLnIgPSByXG4gICAgICAgIHRoaXMuYyA9IGNcbiAgICAgICAgdGhpcy50ID0gdFxuICAgIH1cbiAgICBjcmVhdGUoKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IGNpcmNsZVxuICAgICAgICBjb25zdCAkY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgJGNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUnKVxuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC5hZGQoYGNpcmNsZS0ke3RoaXMueH0tJHt0aGlzLnl9LSR7dGhpcy5yfS0ke3RoaXMuY31gKVxuICAgICAgICAkY2lyY2xlLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnh9JWBcbiAgICAgICAgJGNpcmNsZS5zdHlsZS50b3AgPSBgJHt0aGlzLnl9JWBcblxuICAgICAgICAvLyBTZXQgY29tcG9uZW50c1xuICAgICAgICBjb25zdCAkc3RpY2tfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0ICRzdGlja18yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgJHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgJHN0aWNrXzEuY2xhc3NMaXN0LmFkZCgnc3RpY2stMScpXG4gICAgICAgICRzdGlja18yLmNsYXNzTGlzdC5hZGQoJ3N0aWNrLTInKVxuICAgICAgICAkdGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0JylcbiAgICAgICAgJHRleHQudGV4dENvbnRlbnQgPSB0aGlzLnRcblxuICAgICAgICAvLyBBZGQgY2lyY2xlXG4gICAgICAgICRzdGlja18yLmFwcGVuZENoaWxkKCR0ZXh0KVxuICAgICAgICAkc3RpY2tfMS5hcHBlbmRDaGlsZCgkc3RpY2tfMilcbiAgICAgICAgJGNpcmNsZS5hcHBlbmRDaGlsZCgkc3RpY2tfMSlcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkY2lyY2xlKVxuXG4gICAgICAgIC8vIERldGVjdCBtb3VzZSBtb3ZlXG4gICAgICAgIGNvbnN0IHBvc1ggPSAkY2lyY2xlLm9mZnNldExlZnQgKyAkY2lyY2xlLm9mZnNldFdpZHRoIC8gMlxuICAgICAgICBjb25zdCBwb3NZID0gJGNpcmNsZS5vZmZzZXRUb3AgKyAkY2lyY2xlLm9mZnNldEhlaWdodCAvIDJcbiAgICAgICAgY29uc3QgcG9zQ2lyY2xlID0geyB4OiBwb3NYLCB5OiBwb3NZIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFYID0gZXZlbnQuY2xpZW50WCAtIHBvc1hcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IGV2ZW50LmNsaWVudFkgLSBwb3NZXG4gICAgICAgICAgICBpZlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKGRlbHRhWCkgPD0gJGNpcmNsZS5vZmZzZXRXaWR0aCAqIDIuNSAmJlxuICAgICAgICAgICAgICAgIE1hdGguYWJzKGRlbHRhWSkgPD0gJGNpcmNsZS5vZmZzZXRIZWlnaHQgKiAyLjVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkY2lyY2xlLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgxLjI1KSB0cmFuc2xhdGUoJHtkZWx0YVggKiAwLjEyNX1weCwgJHtkZWx0YVkgKiAwLjEyNX1weClgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJGNpcmNsZS5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoMSkgdHJhbnNsYXRlKDApYFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBkaXNwbGF5KClcbiAgICB7XG4gICAgICAgIGNvbnN0ICRjaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2lyY2xlLSR7dGhpcy54fS0ke3RoaXMueX0tJHt0aGlzLnJ9LSR7dGhpcy5jfWApXG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvd24nKVxuICAgIH1cbiAgICBoaWRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0ICRjaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2lyY2xlLSR7dGhpcy54fS0ke3RoaXMueX0tJHt0aGlzLnJ9LSR7dGhpcy5jfWApXG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2lyY2xlIiwiY29uc3QgJGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyYW1lJylcbmNvbnN0ICRob3VycyA9ICRmcmFtZS5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKVxuY29uc3QgJG1pbnV0ZXMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLm1pbnV0ZXMnKVxuY29uc3QgJHNlY29uZHMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnNlY29uZHMnKVxuY29uc3QgJHBvc0EgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnBvcy1hJylcbmNvbnN0ICRwb3NPID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5wb3MtbycpXG5jb25zdCBwb3NBID0gNDguODU2NjE0XG5jb25zdCBwb3NPID0gMi4yODc1OTIwMDAwMDAwMThcbiBcbnNldEludGVydmFsKCgpID0+XG57XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAkaG91cnMudGV4dENvbnRlbnQgPSBkYXRlLmdldEhvdXJzKClcbiAgICAkbWludXRlcy50ZXh0Q29udGVudCA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgJHNlY29uZHMudGV4dENvbnRlbnQgPSBkYXRlLmdldFNlY29uZHMoKVxuIFxuICAgIGNvbnN0IHZhckEgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCkgLSA1MDApIC8gMTAwMDAwMFxuICAgIGNvbnN0IHZhck8gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkgLSA1MDAwMDAwMDApIC8gMTAwMDAwMDAwMDAwMDAwMFxuICAgICRwb3NBLnRleHRDb250ZW50ID0gcG9zQSArIHZhckFcbiAgICAkcG9zTy50ZXh0Q29udGVudCA9IHBvc08gKyB2YXJPXG59LCAxMDAwKSIsImNvbnN0ICRzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJylcbmNvbnN0ICRzbGlkZXMgPSBBcnJheS5mcm9tKCRzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpXG5cbmxldCBpc1Njcm9sbGluZ1xubGV0IGlzU2Nyb2xsZWQgPSBmYWxzZVxubGV0IGlzUG9zaXRpdmUgPSB0cnVlXG5sZXQgZGVsdGFTY3JvbGwgPSAwXG5sZXQgYmxvY3NcbmxldCBmbG9vciA9IDBcbmxldCBzdGVwID0gMFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChldmVudCkgPT5cbntcbiAgICAvLyBVcGRhdGUgc2Nyb2xsaW5nXG4gICAgaWYgKChldmVudC5kZWx0YVkgPj0gMCkgIT0gaXNQb3NpdGl2ZSlcbiAgICB7XG4gICAgICAgIGlzUG9zaXRpdmUgPSAhaXNQb3NpdGl2ZVxuICAgICAgICBkZWx0YVNjcm9sbCA9IDBcbiAgICB9XG4gICAgZGVsdGFTY3JvbGwgKz0gZXZlbnQuZGVsdGFZXG4gICAgd2luZG93LmNsZWFyVGltZW91dChpc1Njcm9sbGluZylcblxuICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgc2Nyb2xsXG4gICAgaWYgKCFpc1Njcm9sbGVkKVxuICAgIHtcbiAgICAgICAgLy8gR2V0IGFjdGl2ZSBzbGlkZVxuICAgICAgICBjb25zdCAkYWN0aXZlU2xpZGUgPSAkc2xpZGVzLmZpbmQoJHNsaWRlID0+ICRzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKVxuICAgICAgICBjb25zdCAkYmxvY3MgPSBBcnJheS5mcm9tKCRhY3RpdmVTbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvYycpKVxuICAgICAgICBjb25zdCAkYWN0aXZlQmxvYyA9ICRibG9jcy5maW5kKCRibG9jID0+ICRibG9jLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpXG4gICAgICAgIGJsb2NzID0gJGJsb2NzLmxlbmd0aFxuICAgICAgICBzdGVwID0gJHNsaWRlcy5pbmRleE9mKCRhY3RpdmVTbGlkZSlcblxuICAgICAgICAvLyBTY3JvbGwgZG93blxuICAgICAgICBpZiAoZGVsdGFTY3JvbGwgPiAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBCZWxvdyBibG9jXG4gICAgICAgICAgICBpZiAoZmxvb3IgPCBibG9jcyAtIDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVEb3duKCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmlnaHQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKGZsb29yID09IGJsb2NzIC0gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZVJpZ2h0KCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjb2xsIHVwXG4gICAgICAgIGVsc2UgaWYgKGRlbHRhU2Nyb2xsIDwgMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVXBwb24gYmxvY1xuICAgICAgICAgICAgaWYgKGZsb29yID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZVVwKCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTGVmdCBzbGlkZVxuICAgICAgICAgICAgZWxzZSBpZiAoZmxvb3IgPT0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZUxlZnQoJGFjdGl2ZVNsaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNTY3JvbGxlZCA9IHRydWVcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpc1Njcm9sbGVkID0gZmFsc2VcbiAgICAgICAgfSwgMTUwMClcbiAgICB9XG59KVxuXG5jb25zdCBzbGlkZVVwID0gKGN1cnJlbnRTbGlkZSkgPT5cbntcbiAgICBjdXJyZW50U2xpZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7LS1mbG9vciAqIHdpbmRvdy5pbm5lckhlaWdodH1weClgXG59XG5cbmNvbnN0IHNsaWRlRG93biA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0keysrZmxvb3IgKiAxMDB9JSlgXG59XG5cbmNvbnN0IHNsaWRlTGVmdCA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgLy8gTm90IGZpcnN0IHNsaWRlXG4gICAgaWYgKHN0ZXAgPiAwKVxuICAgIHtcbiAgICAgICAgZmxvb3IgPSBBcnJheS5mcm9tKCRzbGlkZXNbc3RlcCAtIDFdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpLmxlbmd0aCAtIDFcbiAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgxMDAlKWBcbiAgICAgICAgJHNsaWRlc1tzdGVwIC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgJHNsaWRlc1tzdGVwIC0gMV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMCUpIHRyYW5zbGF0ZVkoLSR7Zmxvb3IgKiAxMDB9JSlgXG4gICAgfVxufVxuXG5jb25zdCBzbGlkZVJpZ2h0ID0gKGN1cnJlbnRTbGlkZSkgPT5cbntcbiAgICAvLyBOb3QgbGFzdCBzbGlkZVxuICAgIGlmIChzdGVwIDwgJHNsaWRlcy5sZW5ndGggLSAxKVxuICAgIHtcbiAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtMTAwJSkgdHJhbnNsYXRlWSgtJHtmbG9vciAqIDEwMH0lKWBcbiAgICAgICAgJHNsaWRlc1tzdGVwICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgJHNsaWRlc1tzdGVwICsgMV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMCUpYFxuICAgICAgICBmbG9vciA9IDBcbiAgICB9XG59XG5cbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9jaXJjbGVzLmpzJ1xuXG5jb25zdCB0MTEgPSAnQWNjb3JkaW5nIHRvIHBsYW5zIHVudmVpbGVkIGluIFNlcHRlbWJlciAyMDE2LCB0aGUgZmlyc3QgZmxpZ2h0IHRvIE1hcnMgd291bGQgdGFrZSBwbGFjZSBpbiAyMDI0LiBUaGUgcHJvamVjdCwgd2hpY2ggd291bGQgYmUgZGV2ZWxvcGVkIHRoYW5rcyB0byB0aGUgcHJvZml0cyBtYWRlIGJ5IFNwYWNlWCBhbmQgdGhlIHBlcnNvbmFsIHdlYWx0aCBvZiBpdHMgZm91bmRlciBFbG9uIE11c2ssIHdpbGwgZXZlbnR1YWxseSBsZWFkIHRvIHRoZSBlc3RhYmxpc2htZW50IG9mIGEgcGVybWFuZW50IGNvbG9ueSBvbiBNYXJzLidcbmNvbnN0IGMxMSA9IG5ldyBDaXJjbGUoNTAsIDUwLCAxLCAxLCB0MTEpXG5jMTEuY3JlYXRlKClcbmMxMS5kaXNwbGF5KCkiXX0=
