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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY2lyY2xlcy5qcyIsInNyYy9qcy9jb21wb25lbnRzL2ZyYW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2xpZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7SUNGTSxNO0FBRUYsb0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFDQTtBQUFBOztBQUNJLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDSDs7OztpQ0FFRDtBQUNJLGdCQUFNLFVBQVUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0Esb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsYUFBZ0MsS0FBSyxDQUFyQyxTQUEwQyxLQUFLLENBQS9DLFNBQW9ELEtBQUssQ0FBekQsU0FBOEQsS0FBSyxDQUFuRTtBQUNBLG9CQUFRLEtBQVIsQ0FBYyxJQUFkLEdBQXdCLEtBQUssQ0FBN0I7QUFDQSxvQkFBUSxLQUFSLENBQWMsR0FBZCxHQUF1QixLQUFLLENBQTVCO0FBQ0EscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBMUI7QUFDSDs7O2tDQUVEO0FBQ0ksZ0JBQU0sVUFBVSxTQUFTLGFBQVQsY0FBa0MsS0FBSyxDQUF2QyxTQUE0QyxLQUFLLENBQWpELFNBQXNELEtBQUssQ0FBM0QsU0FBZ0UsS0FBSyxDQUFyRSxDQUFoQjtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsT0FBdEI7QUFDSDs7OytCQUVEO0FBQ0ksb0JBQVEsU0FB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QWlCLENBQTVCLEVBQ0E7QUFDSSxxQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLFFBQTlCO0FBQ0EscUJBQWEsS0FBYixDQUFtQixTQUFuQixzQ0FBZ0UsUUFBUSxHQUF4RTtBQUNBLGdCQUFRLE9BQU8sQ0FBZixFQUFrQixTQUFsQixDQUE0QixHQUE1QixDQUFnQyxRQUFoQztBQUNBLGdCQUFRLE9BQU8sQ0FBZixFQUFrQixLQUFsQixDQUF3QixTQUF4QjtBQUNBLGdCQUFRLENBQVI7QUFDSDtBQUNKLENBWEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGZyYW1lIGZyb20gJy4vY29tcG9uZW50cy9mcmFtZS5qcydcbmltcG9ydCBzbGlkZXMgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlcy5qcydcbmltcG9ydCBjaXJjbGVzIGZyb20gJy4vY29tcG9uZW50cy9jaXJjbGVzLmpzJyIsImNsYXNzIENpcmNsZVxue1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHIsIGMpXG4gICAge1xuICAgICAgICB0aGlzLnggPSB4XG4gICAgICAgIHRoaXMueSA9IHlcbiAgICAgICAgdGhpcy5yID0gclxuICAgICAgICB0aGlzLmMgPSBjXG4gICAgfVxuICAgIGNyZWF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCAkY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgJGNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUnKVxuICAgICAgICAkY2lyY2xlLmNsYXNzTGlzdC5hZGQoYGNpcmNsZS0ke3RoaXMueH0tJHt0aGlzLnl9LSR7dGhpcy5yfS0ke3RoaXMuY31gKVxuICAgICAgICAkY2lyY2xlLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnh9JWBcbiAgICAgICAgJGNpcmNsZS5zdHlsZS50b3AgPSBgJHt0aGlzLnl9JWBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkY2lyY2xlKVxuICAgIH1cbiAgICBkaXNwbGF5KClcbiAgICB7XG4gICAgICAgIGNvbnN0ICRjaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2lyY2xlLSR7dGhpcy54fS0ke3RoaXMueX0tJHt0aGlzLnJ9LSR7dGhpcy5jfWApXG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LmFkZCgnc2hvd24nKVxuICAgIH1cbiAgICBoaWRlKClcbiAgICB7XG4gICAgICAgICRjaXJjbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKVxuICAgIH1cbn1cbiBcbmNvbnN0IGNpcmNsZV8xID0gbmV3IENpcmNsZSg1MCwgNTAsIDEsIDEpXG5jaXJjbGVfMS5jcmVhdGUoKVxuY2lyY2xlXzEuZGlzcGxheSgpIiwiY29uc3QgJGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyYW1lJylcbmNvbnN0ICRob3VycyA9ICRmcmFtZS5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKVxuY29uc3QgJG1pbnV0ZXMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLm1pbnV0ZXMnKVxuY29uc3QgJHNlY29uZHMgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnNlY29uZHMnKVxuY29uc3QgJHBvc0EgPSAkZnJhbWUucXVlcnlTZWxlY3RvcignLnBvcy1hJylcbmNvbnN0ICRwb3NPID0gJGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5wb3MtbycpXG5jb25zdCBwb3NBID0gNDguODU2NjE0XG5jb25zdCBwb3NPID0gMi4yODc1OTIwMDAwMDAwMThcbiBcbnNldEludGVydmFsKCgpID0+XG57XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAkaG91cnMudGV4dENvbnRlbnQgPSBkYXRlLmdldEhvdXJzKClcbiAgICAkbWludXRlcy50ZXh0Q29udGVudCA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgJHNlY29uZHMudGV4dENvbnRlbnQgPSBkYXRlLmdldFNlY29uZHMoKVxuIFxuICAgIGNvbnN0IHZhckEgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCkgLSA1MDApIC8gMTAwMDAwMFxuICAgIGNvbnN0IHZhck8gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMCkgLSA1MDAwMDAwMDApIC8gMTAwMDAwMDAwMDAwMDAwMFxuICAgICRwb3NBLnRleHRDb250ZW50ID0gcG9zQSArIHZhckFcbiAgICAkcG9zTy50ZXh0Q29udGVudCA9IHBvc08gKyB2YXJPXG59LCAxMDAwKSIsImNvbnN0ICRzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJylcbmNvbnN0ICRzbGlkZXMgPSBBcnJheS5mcm9tKCRzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpXG5cbmxldCBpc1Njcm9sbGluZ1xubGV0IGlzU2Nyb2xsZWQgPSBmYWxzZVxubGV0IGlzUG9zaXRpdmUgPSB0cnVlXG5sZXQgZGVsdGFTY3JvbGwgPSAwXG5sZXQgYmxvY3NcbmxldCBmbG9vciA9IDBcbmxldCBzdGVwID0gMFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChldmVudCkgPT5cbntcbiAgICAvLyBVcGRhdGUgc2Nyb2xsaW5nXG4gICAgaWYgKChldmVudC5kZWx0YVkgPj0gMCkgIT0gaXNQb3NpdGl2ZSlcbiAgICB7XG4gICAgICAgIGlzUG9zaXRpdmUgPSAhaXNQb3NpdGl2ZVxuICAgICAgICBkZWx0YVNjcm9sbCA9IDBcbiAgICB9XG4gICAgZGVsdGFTY3JvbGwgKz0gZXZlbnQuZGVsdGFZXG4gICAgd2luZG93LmNsZWFyVGltZW91dChpc1Njcm9sbGluZylcblxuICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgc2Nyb2xsXG4gICAgaWYgKCFpc1Njcm9sbGVkKVxuICAgIHtcbiAgICAgICAgLy8gR2V0IGFjdGl2ZSBzbGlkZVxuICAgICAgICBjb25zdCAkYWN0aXZlU2xpZGUgPSAkc2xpZGVzLmZpbmQoJHNsaWRlID0+ICRzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKVxuICAgICAgICBjb25zdCAkYmxvY3MgPSBBcnJheS5mcm9tKCRhY3RpdmVTbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvYycpKVxuICAgICAgICBjb25zdCAkYWN0aXZlQmxvYyA9ICRibG9jcy5maW5kKCRibG9jID0+ICRibG9jLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpXG4gICAgICAgIGJsb2NzID0gJGJsb2NzLmxlbmd0aFxuICAgICAgICBzdGVwID0gJHNsaWRlcy5pbmRleE9mKCRhY3RpdmVTbGlkZSlcblxuICAgICAgICAvLyBTY3JvbGwgZG93blxuICAgICAgICBpZiAoZGVsdGFTY3JvbGwgPiAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBCZWxvdyBibG9jXG4gICAgICAgICAgICBpZiAoZmxvb3IgPCBibG9jcyAtIDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2xpZGVEb3duKCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmlnaHQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKGZsb29yID09IGJsb2NzIC0gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZVJpZ2h0KCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNjb2xsIHVwXG4gICAgICAgIGVsc2UgaWYgKGRlbHRhU2Nyb2xsIDwgMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVXBwb24gYmxvY1xuICAgICAgICAgICAgaWYgKGZsb29yID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZVVwKCRhY3RpdmVTbGlkZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTGVmdCBzbGlkZVxuICAgICAgICAgICAgZWxzZSBpZiAoZmxvb3IgPT0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbGlkZUxlZnQoJGFjdGl2ZVNsaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNTY3JvbGxlZCA9IHRydWVcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpc1Njcm9sbGVkID0gZmFsc2VcbiAgICAgICAgfSwgMTUwMClcbiAgICB9XG59KVxuXG5jb25zdCBzbGlkZVVwID0gKGN1cnJlbnRTbGlkZSkgPT5cbntcbiAgICBjdXJyZW50U2xpZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7LS1mbG9vciAqIHdpbmRvdy5pbm5lckhlaWdodH1weClgXG59XG5cbmNvbnN0IHNsaWRlRG93biA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0keysrZmxvb3IgKiAxMDB9JSlgXG59XG5cbmNvbnN0IHNsaWRlTGVmdCA9IChjdXJyZW50U2xpZGUpID0+XG57XG4gICAgLy8gTm90IGZpcnN0IHNsaWRlXG4gICAgaWYgKHN0ZXAgPiAwKVxuICAgIHtcbiAgICAgICAgZmxvb3IgPSBBcnJheS5mcm9tKCRzbGlkZXNbc3RlcCAtIDFdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpLmxlbmd0aCAtIDFcbiAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgxMDAlKWBcbiAgICAgICAgJHNsaWRlc1tzdGVwIC0gMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgJHNsaWRlc1tzdGVwIC0gMV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMCUpIHRyYW5zbGF0ZVkoLSR7Zmxvb3IgKiAxMDB9JSlgXG4gICAgfVxufVxuXG5jb25zdCBzbGlkZVJpZ2h0ID0gKGN1cnJlbnRTbGlkZSkgPT5cbntcbiAgICAvLyBOb3QgbGFzdCBzbGlkZVxuICAgIGlmIChzdGVwIDwgJHNsaWRlcy5sZW5ndGggLSAxKVxuICAgIHtcbiAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGN1cnJlbnRTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtMTAwJSkgdHJhbnNsYXRlWSgtJHtmbG9vciAqIDEwMH0lKWBcbiAgICAgICAgJHNsaWRlc1tzdGVwICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgJHNsaWRlc1tzdGVwICsgMV0uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMCUpYFxuICAgICAgICBmbG9vciA9IDBcbiAgICB9XG59Il19
