let nn
let points = []
let trainingIndex = 0

function setup() {
  createCanvas(400, 400)
  //for (let i = 0; i < 100; i++) points.push(new Point())
  nn = new NeuralNetwork([2, 10, 8, 1])
}

function draw() {
  background('#212121')
  // добавление точек при зажатой клавише мыши
  if (mouseIsPressed) {
    points.push(new Point(mouseX / width, 1 - mouseY / height, mouseButton == 'left' ? 1 : 0))
  }
  // отображение предсказаний нейронной сети
  const resolution = 5
  const cols = width / resolution
  const rows = height / resolution
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const y = nn.predict([i / cols, j / rows])[0]
      noStroke()
      fill(100, y * 255, 100)
      rect(i * resolution, (rows - j - 1) * resolution, resolution, resolution)
    }
  }
  // рисование точек
  points.forEach(p => p.show())
  // обучение нейронной сети
  if (!mouseIsPressed && points.length > 0) {
    for (let i = 0; i < 1000; i++) {
      const p = random(points)
      nn.train([p.x, p.y], [p.label])
    }
  }
}
// удаление контекстного меню
window.addEventListener('contextmenu', e => e.preventDefault())