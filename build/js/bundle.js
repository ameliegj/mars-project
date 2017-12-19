(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slides = require('./components/slides.js');

var _slides2 = _interopRequireDefault(_slides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./components/slides.js":2}],2:[function(require,module,exports){
'use strict';

var $slides = Array.from(document.querySelectorAll('.slide'));

for (var index = 0; index < $slides.length; index++) {
    $slides[index].style.left = index * 100 + '%';
}

var isScrolling = void 0;
var deltaScroll = 0;
var floor = 0;

window.addEventListener('mousewheel', function (event) {
    // Update scrolling
    window.clearTimeout(isScrolling);
    deltaScroll += event.deltaY;

    // Detect scroll stop
    isScrolling = setTimeout(function () {
        // Get active slide
        var $activeSlide = $slides.find(function (slide) {
            return slide.classList.contains('active');
        });

        // Scroll down
        if (deltaScroll > window.innerHeight / 10) {
            // Below floor
            if (floor < Array.from($activeSlide.querySelectorAll('.bloc')).length - 1) {
                floor++;
                $activeSlide.style.transform = 'translateY(-' + floor * 100 + 'vh)';
            }

            // Right slide
            else if (floor == Array.from($activeSlide.querySelectorAll('.bloc')).length - 1) {
                    var _index = $slides.indexOf($activeSlide);

                    // Not last slide
                    if (_index < $slides.length - 1) {
                        floor = 0;
                        $activeSlide.classList.remove('active');
                        $slides[_index + 1].classList.add('active');
                        document.body.style.transform = 'translateX(-' + (_index + 1) * 100 + 'vw)';
                    }
                }
        }

        // Scoll up
        else if (deltaScroll < window.innerHeight / 10) {
                // Uppon floor
                if (floor > 0) {
                    floor--;
                    $activeSlide.style.transform = 'translateY(-' + floor * 100 + 'vh)';
                }

                // Left slide
                else if (floor == 0) {
                        var _index2 = $slides.indexOf($activeSlide);

                        // Not first slide
                        if (_index2 > 0) {
                            floor = Array.from($slides[_index2 - 1].querySelectorAll('.bloc')).length - 1;
                            $activeSlide.classList.remove('active');
                            $slides[_index2 - 1].classList.add('active');
                            document.body.style.transform = 'translateX(-' + (_index2 - 1) * 100 + 'vw)';
                        }
                    }
            }

        // Reinit variation
        deltaScroll = 0;
    }, 75);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2xpZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7O0FDQUEsSUFBTSxVQUFVLE1BQU0sSUFBTixDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBWCxDQUFoQjs7QUFFQSxLQUFLLElBQUksUUFBUSxDQUFqQixFQUFxQixRQUFRLFFBQVEsTUFBckMsRUFBOEMsT0FBOUMsRUFDQTtBQUNJLFlBQVEsS0FBUixFQUFlLEtBQWYsQ0FBcUIsSUFBckIsR0FBK0IsUUFBUSxHQUF2QztBQUNIOztBQUVELElBQUksb0JBQUo7QUFDQSxJQUFJLGNBQWMsQ0FBbEI7QUFDQSxJQUFJLFFBQVEsQ0FBWjs7QUFFQSxPQUFPLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFVBQUMsS0FBRCxFQUN0QztBQUNJO0FBQ0EsV0FBTyxZQUFQLENBQW9CLFdBQXBCO0FBQ0EsbUJBQWUsTUFBTSxNQUFyQjs7QUFFQTtBQUNBLGtCQUFjLFdBQVcsWUFDekI7QUFDSTtBQUNBLFlBQU0sZUFBZSxRQUFRLElBQVIsQ0FBYTtBQUFBLG1CQUFTLE1BQU0sU0FBTixDQUFnQixRQUFoQixDQUF5QixRQUF6QixDQUFUO0FBQUEsU0FBYixDQUFyQjs7QUFFQTtBQUNBLFlBQUksY0FBYyxPQUFPLFdBQVAsR0FBcUIsRUFBdkMsRUFDQTtBQUNJO0FBQ0EsZ0JBQUksUUFBUSxNQUFNLElBQU4sQ0FBVyxhQUFhLGdCQUFiLENBQThCLE9BQTlCLENBQVgsRUFBbUQsTUFBbkQsR0FBNEQsQ0FBeEUsRUFDQTtBQUNJO0FBQ0EsNkJBQWEsS0FBYixDQUFtQixTQUFuQixvQkFBOEMsUUFBUSxHQUF0RDtBQUNIOztBQUVEO0FBTkEsaUJBT0ssSUFBSSxTQUFTLE1BQU0sSUFBTixDQUFXLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsQ0FBWCxFQUFtRCxNQUFuRCxHQUE0RCxDQUF6RSxFQUNMO0FBQ0ksd0JBQU0sU0FBUSxRQUFRLE9BQVIsQ0FBZ0IsWUFBaEIsQ0FBZDs7QUFFQTtBQUNBLHdCQUFJLFNBQVEsUUFBUSxNQUFSLEdBQWlCLENBQTdCLEVBQ0E7QUFDSSxnQ0FBUSxDQUFSO0FBQ0EscUNBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixRQUE5QjtBQUNBLGdDQUFRLFNBQVEsQ0FBaEIsRUFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsUUFBakM7QUFDQSxpQ0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixTQUFwQixvQkFBK0MsQ0FBQyxTQUFRLENBQVQsSUFBYyxHQUE3RDtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQXpCQSxhQTBCSyxJQUFJLGNBQWMsT0FBTyxXQUFQLEdBQXFCLEVBQXZDLEVBQ0w7QUFDSTtBQUNBLG9CQUFJLFFBQVEsQ0FBWixFQUNBO0FBQ0k7QUFDQSxpQ0FBYSxLQUFiLENBQW1CLFNBQW5CLG9CQUE4QyxRQUFRLEdBQXREO0FBQ0g7O0FBRUQ7QUFOQSxxQkFPSyxJQUFJLFNBQVMsQ0FBYixFQUNMO0FBQ0ksNEJBQU0sVUFBUSxRQUFRLE9BQVIsQ0FBZ0IsWUFBaEIsQ0FBZDs7QUFFQTtBQUNBLDRCQUFJLFVBQVEsQ0FBWixFQUNBO0FBQ0ksb0NBQVEsTUFBTSxJQUFOLENBQVcsUUFBUSxVQUFRLENBQWhCLEVBQW1CLGdCQUFuQixDQUFvQyxPQUFwQyxDQUFYLEVBQXlELE1BQXpELEdBQWtFLENBQTFFO0FBQ0EseUNBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixRQUE5QjtBQUNBLG9DQUFRLFVBQVEsQ0FBaEIsRUFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsUUFBakM7QUFDQSxxQ0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixTQUFwQixvQkFBK0MsQ0FBQyxVQUFRLENBQVQsSUFBYyxHQUE3RDtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLHNCQUFjLENBQWQ7QUFDSCxLQTNEYSxFQTJEWCxFQTNEVyxDQUFkO0FBNERILENBbkVEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzbGlkZXMgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlcy5qcyciLCJjb25zdCAkc2xpZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKSlcblxuZm9yIChsZXQgaW5kZXggPSAwIDsgaW5kZXggPCAkc2xpZGVzLmxlbmd0aCA7IGluZGV4KyspXG57XG4gICAgJHNsaWRlc1tpbmRleF0uc3R5bGUubGVmdCA9IGAke2luZGV4ICogMTAwfSVgXG59XG5cbmxldCBpc1Njcm9sbGluZ1xubGV0IGRlbHRhU2Nyb2xsID0gMFxubGV0IGZsb29yID0gMFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChldmVudCkgPT5cbntcbiAgICAvLyBVcGRhdGUgc2Nyb2xsaW5nXG4gICAgd2luZG93LmNsZWFyVGltZW91dChpc1Njcm9sbGluZylcbiAgICBkZWx0YVNjcm9sbCArPSBldmVudC5kZWx0YVlcblxuICAgIC8vIERldGVjdCBzY3JvbGwgc3RvcFxuICAgIGlzU2Nyb2xsaW5nID0gc2V0VGltZW91dCgoKSA9PlxuICAgIHtcbiAgICAgICAgLy8gR2V0IGFjdGl2ZSBzbGlkZVxuICAgICAgICBjb25zdCAkYWN0aXZlU2xpZGUgPSAkc2xpZGVzLmZpbmQoc2xpZGUgPT4gc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcblxuICAgICAgICAvLyBTY3JvbGwgZG93blxuICAgICAgICBpZiAoZGVsdGFTY3JvbGwgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQmVsb3cgZmxvb3JcbiAgICAgICAgICAgIGlmIChmbG9vciA8IEFycmF5LmZyb20oJGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jJykpLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmxvb3IrK1xuICAgICAgICAgICAgICAgICRhY3RpdmVTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtmbG9vciAqIDEwMH12aClgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJpZ2h0IHNsaWRlXG4gICAgICAgICAgICBlbHNlIGlmIChmbG9vciA9PSBBcnJheS5mcm9tKCRhY3RpdmVTbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvYycpKS5sZW5ndGggLSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJHNsaWRlcy5pbmRleE9mKCRhY3RpdmVTbGlkZSlcblxuICAgICAgICAgICAgICAgIC8vIE5vdCBsYXN0IHNsaWRlXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgJHNsaWRlcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmxvb3IgPSAwXG4gICAgICAgICAgICAgICAgICAgICRhY3RpdmVTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzW2luZGV4ICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHsoaW5kZXggKyAxKSAqIDEwMH12dylgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2NvbGwgdXBcbiAgICAgICAgZWxzZSBpZiAoZGVsdGFTY3JvbGwgPCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVXBwb24gZmxvb3JcbiAgICAgICAgICAgIGlmIChmbG9vciA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmxvb3ItLVxuICAgICAgICAgICAgICAgICRhY3RpdmVTbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtmbG9vciAqIDEwMH12aClgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExlZnQgc2xpZGVcbiAgICAgICAgICAgIGVsc2UgaWYgKGZsb29yID09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2xpZGVzLmluZGV4T2YoJGFjdGl2ZVNsaWRlKVxuXG4gICAgICAgICAgICAgICAgLy8gTm90IGZpcnN0IHNsaWRlXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZsb29yID0gQXJyYXkuZnJvbSgkc2xpZGVzW2luZGV4IC0gMV0ucXVlcnlTZWxlY3RvckFsbCgnLmJsb2MnKSkubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAkYWN0aXZlU2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlc1tpbmRleCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7KGluZGV4IC0gMSkgKiAxMDB9dncpYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlaW5pdCB2YXJpYXRpb25cbiAgICAgICAgZGVsdGFTY3JvbGwgPSAwXG4gICAgfSwgNzUpXG59KSJdfQ==
