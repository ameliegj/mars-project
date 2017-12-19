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
        const $activeSlide = $slides.find(slide => slide.classList.contains('active'))
        blocs = Array.from($activeSlide.querySelectorAll('.bloc')).length
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
        floor = blocs - 1
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