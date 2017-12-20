const $slider = document.querySelector('.slider')
const $slides = Array.from($slider.querySelectorAll('.slide'))

let isScrolling
let isScrolled = false
let isPositive = true
let deltaScroll = 0
let blocs
let floor = 0
let step = 0

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
        const $activeBloc = $blocs.find($bloc => $bloc.classList.contains('active'))
        blocs = $blocs.length
        step = $slides.indexOf($activeSlide)

        // Scroll down
        if (deltaScroll > 0)
        {
            // Below bloc
            if (floor < blocs - 1)
            {
                slideDown($activeSlide)
            }

            // Right slide
            else if (floor == blocs - 1)
            {
                slideRight($activeSlide)
            }
        }

        // Scoll up
        else if (deltaScroll < 0)
        {
            // Uppon bloc
            if (floor > 0)
            {
                slideUp($activeSlide)
            }

            // Left slide
            else if (floor == 0)
            {
                slideLeft($activeSlide)
            }
        }

        isScrolled = true
        setTimeout(() =>
        {
            isScrolled = false
        }, 1500)
    }
})

const slideUp = (currentSlide) =>
{
    currentSlide.style.transform = `translateY(-${--floor * window.innerHeight}px)`
}

const slideDown = (currentSlide) =>
{
    currentSlide.style.transform = `translateY(-${++floor * 100}%)`
}

const slideLeft = (currentSlide) =>
{
    // Not first slide
    if (step > 0)
    {
        floor = Array.from($slides[step - 1].querySelectorAll('.bloc')).length - 1
        currentSlide.classList.remove('active')
        currentSlide.style.transform = `translateX(100%)`
        $slides[step - 1].classList.add('active')
        $slides[step - 1].style.transform = `translateX(0%) translateY(-${floor * 100}%)`
    }
}

const slideRight = (currentSlide) =>
{
    // Not last slide
    if (step < $slides.length - 1)
    {
        currentSlide.classList.remove('active')
        currentSlide.style.transform = `translateX(-100%) translateY(-${floor * 100}%)`
        $slides[step + 1].classList.add('active')
        $slides[step + 1].style.transform = `translateX(0%)`
        floor = 0
    }
}

import Circle from './circles.js'

const t11 = 'According to plans unveiled in September 2016, the first flight to Mars would take place in 2024. The project, which would be developed thanks to the profits made by SpaceX and the personal wealth of its founder Elon Musk, will eventually lead to the establishment of a permanent colony on Mars.'
const c11 = new Circle(50, 50, 1, 1, t11)
c11.create()
c11.display()