//const f = x => 2 * x ** 2 - 2 * x + 0.8

const f = x => sin(x * 2 * PI) / 2 + 0.5

class Point {
  constructor(x = random(), y = random(), label) {
    this.x = x
    this.y = y
    if (label == undefined) this.label = this.y > f(this.x) ? 1 : 0
    else this.label = label
  }
  pixelX = () => map(this.x, 0, 1, 0, width)
  pixelY = () => map(this.y, 0, 1, height, 0)
  show() {
    strokeWeight(10)
    stroke(this.label ? '#ff1744' : '#e040fb')
    point(this.pixelX(), this.pixelY())
  }
}