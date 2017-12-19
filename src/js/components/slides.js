const $slider = document.querySelector('.slider')
const $slides = Array.from($slider.querySelectorAll('.slide'))

let isScrolling
let isScrolled = false
let isPositive = true
let deltaScroll = 0
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
        const $blocsNumber = Array.from($activeSlide.querySelectorAll('.bloc')).length
        step = $slides.indexOf($activeSlide)

        // Scroll down
        if (deltaScroll > 0)
        {
            // Below bloc
            if (floor < $blocsNumber - 1)
            {
                $activeSlide.style.transform = `translateY(-${++floor * 100}%)`
            }

            // Right slide
            else if (floor == $blocsNumber - 1)
            {
                
                // Not last slide
                if (step < $slides.length - 1)
                {
                    $activeSlide.classList.remove('active')
                    $activeSlide.style.transform = `translateX(-100%) translateY(-${floor * 100}%)`
                    $slides[step + 1].classList.add('active')
                    $slides[step + 1].style.transform = `translateX(0%)`
                    floor = 0
                }
            }
        }

        // Scoll up
        else if (deltaScroll < 0)
        {
            // Uppon bloc
            if (floor > 0)
            {
                $activeSlide.style.transform = `translateY(-${--floor * window.innerHeight}px)`
            }

            // Left slide
            else if (floor == 0)
            {
                // Not first slide
                if (step > 0)
                {
                    floor = $blocsNumber - 1
                    $activeSlide.classList.remove('active')
                    $activeSlide.style.transform = `translateX(100%)`
                    $slides[step - 1].classList.add('active')
                    $slides[step - 1].style.transform = `translateX(0%) translateY(-${floor * 100}%)`
                }
            }
        }

        isScrolled = true
        setTimeout(() =>
        {
            isScrolled = false
        }, 1500)
    }
})