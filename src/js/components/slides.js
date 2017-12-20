const $frame = document.querySelector('.frame')
const $title = $frame.querySelector('.title')
const $slider = document.querySelector('.slider')
const $slides = Array.from($slider.querySelectorAll('.slide'))

let isScrolling
let isScrolled = false
let isPositive = true
let deltaScroll = 0
let move
let blocs
let row = 0
let col = 0

window.addEventListener('mousewheel', (event) =>
{
    // Update scrolling
    if ((event.deltaY >= 0) != isPositive)
    {
        isPositive = !isPositive
        deltaScroll = 0
    }
    deltaScroll += event.deltaY
    window.clearTimeout(isScrolling)

    // Prevent multiple scroll
    if (!isScrolled)
    {
        // Get active slide
        const $activeSlide = $slides.find($slide => $slide.classList.contains('active'))
        const $blocs = Array.from($activeSlide.querySelectorAll('.bloc'))
        const $activeBloc = $blocs[row]
        blocs = $blocs.length

        // Scroll down
        if (deltaScroll > 0)
        {
            // Below bloc
            if (row < blocs - 1)
            {
                slideDown($activeSlide, $activeBloc)
            }

            // Right slide
            else if (row == blocs - 1)
            {
                slideRight($activeSlide, $activeBloc)
            }
        }

        // Scoll up
        else if (deltaScroll < 0)
        {
            // Uppon bloc
            if (row > 0)
            {
                slideUp($activeSlide, $activeBloc)
            }

            // Left slide
            else if (row == 0)
            {
                slideLeft($activeSlide, $activeBloc)
            }
        }

        typeTitle()

        isScrolled = true
        setTimeout(() =>
        {
            isScrolled = false
        }, 1500)
    }
})

const slideUp = (currentSlide, currentBloc) =>
{
    currentSlide.style.transform = `translateY(-${--row * window.innerHeight}px)`
    currentBloc.classList.remove('active')
    Array.from(currentSlide.querySelectorAll('.bloc'))[row].classList.add('active')
    move = 'up'
}

const slideDown = (currentSlide, currentBloc) =>
{
    currentSlide.style.transform = `translateY(-${++row * 100}%)`
    currentBloc.classList.remove('active')
    Array.from(currentSlide.querySelectorAll('.bloc'))[row].classList.add('active')
    move = 'down'
}

const slideLeft = (currentSlide, currentBloc) =>
{
    // Not first slide
    if (col > 0)
    {
        col--
        row = Array.from($slides[col].querySelectorAll('.bloc')).length - 1
        currentSlide.classList.remove('active')
        currentSlide.style.transform = `translateX(100%)`
        $slides[col].classList.add('active')
        $slides[col].style.transform = `translateX(0%) translateY(-${row * 100}%)`
        currentBloc.classList.remove('active')
        Array.from($slides[col].querySelectorAll('.bloc'))[row].classList.add('active')
        move = 'left'
    }
}

const slideRight = (currentSlide, currentBloc) =>
{
    // Not last slide
    if (col < $slides.length - 1)
    {
        col++
        currentSlide.classList.remove('active')
        currentSlide.style.transform = `translateX(-100%) translateY(-${row * 100}%)`
        $slides[col].classList.add('active')
        $slides[col].style.transform = `translateX(0%)`
        row = 0
        currentBloc.classList.remove('active')
        Array.from($slides[col].querySelectorAll('.bloc'))[row].classList.add('active')
        move = 'right'
    }
}

const typeTitle = () =>
{
    if (row == 0 && col == 1 && move == 'right')
    {
        //$title.classList.add('hidden')
    }
    else if (row == 0 && col == 0)
    {
        //$title.classList.remove('hidden')
    }
}