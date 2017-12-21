class Circle
{
    constructor(x, y, c, r, t)
    {
        this.x = x
        this.y = y
        this.c = c
        this.r = r
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

        if (this.x > 50)
        {
            $circle.classList.add('return')
            $text.style.transformOrigin = '50% 50%'
            $text.style.transform = 'rotateZ(180deg)'
            $text.style.direction = 'rtl'
        }

        // Add circle
        $stick_2.appendChild($text)
        $stick_1.appendChild($stick_2)
        $circle.appendChild($stick_1)
        document.body.appendChild($circle)

        // Move
        const posX = $circle.offsetLeft + $circle.offsetWidth / 2
        const posY = $circle.offsetTop + $circle.offsetHeight / 2
        const posCircle = { x: posX, y: posY }

        const moveCircle = (event) =>
        {
            if ($circle.classList.contains('shown'))
            {
                const deltaX = event.clientX - posX
                const deltaY = event.clientY - posY
                if
                (
                    Math.abs(deltaX) <= $circle.offsetWidth * 2.5 &&
                    Math.abs(deltaY) <= $circle.offsetHeight * 2.5
                )
                {
                    $circle.style.transform = `scale(1.25) translate(${deltaX * 0.125}px, ${deltaY * 0.125}px) rotateZ(${!$circle.classList.contains('return') ? 0 : 180}deg)`
                }
                else
                {
                    $circle.style.transform = `scale(1) translate(0) rotateZ(${!$circle.classList.contains('return') ? 0 : 180}deg)`
                }
            }
        }

        window.addEventListener('mousemove', (event) =>
        {
            moveCircle(event)
        })
    }
    display()
    {
        const $circle = document.querySelector(`.circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.classList.add('shown')
        $circle.style.transform = `scale(1) translate(0) rotateZ(${!$circle.classList.contains('return') ? 0 : 180}deg)`
    }
    hide()
    {
        const $circle = document.querySelector(`.circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.classList.remove('shown')
        $circle.style.transform = `scale(0) translate(0) rotateZ(${!$circle.classList.contains('return') ? 0 : 180}deg)`
    }
}

export default Circle