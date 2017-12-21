const $parallax = document.querySelectorAll('.parallax')

for (const $element of $parallax) {
	$element.parallaxX = 0
	$element.parallaxY = 0
}

const delta = {
	x: 0,
	y: 0
}

window.addEventListener('mousemove', (event) => {
	delta.x = -(event.clientX / window.innerWidth - 0.5)
	delta.y = -(event.clientY / window.innerHeight - 0.5)
})

const loop = () => {
	window.requestAnimationFrame(loop)

	for (const $element of $parallax) {
		$element.parallaxX += ((delta.x / $element.dataset.depth * 100) - $element.parallaxX) * 0.1
		$element.parallaxY += ((delta.y / $element.dataset.depth * 100) - $element.parallaxY) * 0.1

		$element.style.transform = `translate(${$element.parallaxX}px, ${$element.parallaxY}px)`
	}
}
loop()