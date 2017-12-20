const $frame = document.querySelector('.frame')
const $hours = $frame.querySelector('.hours')
const $minutes = $frame.querySelector('.minutes')
const $seconds = $frame.querySelector('.seconds')
const $posA = $frame.querySelector('.pos-a')
const $posO = $frame.querySelector('.pos-o')
const posA = 48.856614
const posO = 2.287592000000018
 
setInterval(() =>
{
    const date = new Date()
    $hours.textContent = date.getHours()
    $minutes.textContent = date.getMinutes()
    $seconds.textContent = date.getSeconds()
 
    const varA = (Math.floor(Math.random() * 1000) - 500) / 1000000
    const varO = (Math.floor(Math.random() * 1000000000) - 500000000) / 1000000000000000
    $posA.textContent = posA + varA
    $posO.textContent = posO + varO
}, 1000)