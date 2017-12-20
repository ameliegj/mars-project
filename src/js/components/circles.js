class Circle
{
    constructor(x, y, r, c)
    {
        this.x = x
        this.y = y
        this.r = r
        this.c = c
    }
    create()
    {
        const $circle = document.createElement('div')
        $circle.classList.add('circle')
        $circle.classList.add(`circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.style.left = `${this.x}%`
        $circle.style.top = `${this.y}%`
        document.body.appendChild($circle)
    }
    display()
    {
        const $circle = document.querySelector(`.circle-${this.x}-${this.y}-${this.r}-${this.c}`)
        $circle.classList.add('shown')
    }
    hide()
    {
        $circle.classList.remove('shown')
    }
}
 
const circle_1 = new Circle(50, 50, 1, 1)
circle_1.create()
circle_1.display()