const $slides = Array.from(document.querySelectorAll('.slide'))

for (let index = 0 ; index < $slides.length ; index++)
{
    $slides[index].style.left = `${index * 100}%`
}

let isScrolling
let deltaScroll = 0
let floor = 0

window.addEventListener('mousewheel', (event) =>
{
    // Update scrolling
    window.clearTimeout(isScrolling)
    deltaScroll += event.deltaY

    // Detect scroll stop
    isScrolling = setTimeout(() =>
    {
        // Get active slide
        const $activeSlide = $slides.find(slide => slide.classList.contains('active'))

        // Scroll down
        if (deltaScroll > window.innerHeight / 10)
        {
            // Below floor
            if (floor < Array.from($activeSlide.querySelectorAll('.bloc')).length - 1)
            {
                floor++
                $activeSlide.style.transform = `translateY(-${floor * 100}vh)`
            }

            // Right slide
            else if (floor == Array.from($activeSlide.querySelectorAll('.bloc')).length - 1)
            {
                const index = $slides.indexOf($activeSlide)

                // Not last slide
                if (index < $slides.length - 1)
                {
                    floor = 0
                    $activeSlide.classList.remove('active')
                    $slides[index + 1].classList.add('active')
                    document.body.style.transform = `translateX(-${(index + 1) * 100}vw)`
                }
            }
        }

        // Scoll up
        else if (deltaScroll < window.innerHeight / 10)
        {
            // Uppon floor
            if (floor > 0)
            {
                floor--
                $activeSlide.style.transform = `translateY(-${floor * 100}vh)`
            }

            // Left slide
            else if (floor == 0)
            {
                const index = $slides.indexOf($activeSlide)

                // Not first slide
                if (index > 0)
                {
                    floor = Array.from($slides[index - 1].querySelectorAll('.bloc')).length - 1
                    $activeSlide.classList.remove('active')
                    $slides[index - 1].classList.add('active')
                    document.body.style.transform = `translateX(-${(index - 1) * 100}vw)`
                }
            }
        }

        // Reinit variation
        deltaScroll = 0
    }, 75)
})