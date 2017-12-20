import slideRight from './slides.js'

const $slides = Array.from(document.querySelectorAll('.slide'))
const $activeSlide = $slides.find(slide => slide.classList.contains('active'))

window.addEventListener('click', slideRight)