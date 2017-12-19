const $slider = document.querySelector('.slider')
const $slides = Array.from($slider.querySelectorAll('.slide'))

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
        console.log(deltaScroll)

        // Scroll down
        if (deltaScroll > 0)
        {
            // Below floor
            if (floor < Array.from($activeSlide.querySelectorAll('.bloc')).length - 1)
            {
                floor++
                $activeSlide.style.transform = `translateY(-${Math.min(deltaScroll, window.innerHeight)}px)`
            }
        }

        // Scoll up
        else if (deltaScroll < 0)
        {
            console.log('up')
        }

        // Reinit variation
        deltaScroll = 0
    }, 75)
})




            // // Right slide
            // else if (floor == Array.from($activeSlide.querySelectorAll('.bloc')).length - 1)
            // {
            //     const index = $slides.indexOf($activeSlide)

            //     // Not last slide
            //     if (index < $slides.length - 1)
            //     {
            //         floor = 0
            //         $activeSlide.classList.remove('active')
            //         $slides[index + 1].classList.add('active')
            //         document.body.style.transform = `translateX(-${(index + 1) * 100}vw)`
            //     }
            // }


            // // Uppon floor
            // if (floor > 0)
            // {
            //     floor--
            //     $activeSlide.style.transform = `translateY(-${floor * 100}vh)`
            // }

            // // Left slide
            // else if (floor == 0)
            // {
            //     const index = $slides.indexOf($activeSlide)

            //     // Not first slide
            //     if (index > 0)
            //     {
            //         floor = Array.from($slides[index - 1].querySelectorAll('.bloc')).length - 1
            //         $activeSlide.classList.remove('active')
            //         $slides[index - 1].classList.add('active')
            //         document.body.style.transform = `translateX(-${(index - 1) * 100}vw)`
            //     }
            // }