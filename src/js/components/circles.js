class Circle
{
    constructor(x, y, r, c, t)
    {
        this.x = x
        this.y = y
        this.r = r
        this.c = c
        this.t = t
    }
    create()
    {
        // Set circle
        const $circle = document.createElement('div')
        $circle.classList.add('circle')
        $circle.classList.add(`circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.style.left = `${this.x}%`
        $circle.style.top = `${this.y}%`

        // Set components
        const $stick_1 = document.createElement('div')
        const $stick_2 = document.createElement('div')
        const $text = document.createElement('p')
        $stick_1.classList.add('stick-1')
        $stick_2.classList.add('stick-2')
        $text.classList.add('text')
        $text.textContent = this.t

        // Add circle
        $stick_2.appendChild($text)
        $stick_1.appendChild($stick_2)
        $circle.appendChild($stick_1)
        document.body.appendChild($circle)

        // Detect mouse move
        const posX = $circle.offsetLeft + $circle.offsetWidth / 2
        const posY = $circle.offsetTop + $circle.offsetHeight / 2
        const posCircle = { x: posX, y: posY }
        window.addEventListener('mousemove', (event) =>
        {
            const deltaX = event.clientX - posX
            const deltaY = event.clientY - posY
            if
            (
                Math.abs(deltaX) <= $circle.offsetWidth * 2.5 &&
                Math.abs(deltaY) <= $circle.offsetHeight * 2.5
            )
            {
                $circle.style.transform = `scale(1.25) translate(${deltaX * 0.125}px, ${deltaY * 0.125}px)`
            }
            else
            {
                $circle.style.transform = `scale(1) translate(0)`
            }
        })
    }
    display()
    {
        const $circle = document.querySelector(`.circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.classList.toggle('shown')
    }
    hide()
    {
        const $circle = document.querySelector(`.circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.classList.remove('shown')
    }
}

export default Circle