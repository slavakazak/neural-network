const sigmoid = x => 1 / (1 + Math.exp(-x))
const dsigmoid = y => y * (1 - y)

class NeuralNetwork {
  constructor(nodes) {
    this.nodes = nodes // колличество узлов каждого слоя
    this.weights = [] // веса
    this.bias = [] // смещения
    // заполнение весов и смещений случайными значениями
    for (let i = 1; i < this.nodes.length; i++) {
      this.weights.push(new Matrix(this.nodes[i], this.nodes[i - 1]).randomize())
      this.bias.push(new Matrix(this.nodes[i], 1).randomize())
    }
    this.learning_rate = 0.1 // скорость обучения
  }
  setLearningRate(learning_rate) {
    this.learning_rate = learning_rate
  }
  predict(input_array) {
    // прямой проход по сети
    const layers = [Matrix.fromArray(input_array)]
    for (let i = 0; i < this.weights.length; i++) {
      // L(i) = sigm[ W(i) * L(i-1) + B(i) ]
      layers.push(Matrix.multiply(this.weights[i], layers[layers.length - 1]).add(this.bias[i]).map(sigmoid))
    }
    return layers[layers.length - 1].toArray()
  }
  train(input_array, target_array) {
    // прямой проход по сети
    const layers = [Matrix.fromArray(input_array)]
    for (let i = 0; i < this.weights.length; i++) {
      layers.push(Matrix.multiply(this.weights[i], layers[layers.length - 1]).add(this.bias[i]).map(sigmoid))
    }
    // расчёт ошибок выходного слоя
    const targets = Matrix.fromArray(target_array)
    let errors = Matrix.subtract(targets, layers[layers.length - 1])
    // пересчёт всех весов
    for (let i = this.weights.length - 1; i >= 0; i--) {
      // расчёт градинта и дельт весов
      const gradients = Matrix.map(layers[i + 1], dsigmoid).multiply(errors).multiply(this.learning_rate)
      const layer_t = Matrix.transpose(layers[i])
      const weights_deltas = Matrix.multiply(gradients, layer_t)
      // пересчёт весов и смещений
      this.weights[i].add(weights_deltas)
      this.bias[i].add(gradients)
      // расчёт ошибок следующего слоя
      const weights_t = Matrix.transpose(this.weights[i])
      errors = Matrix.multiply(weights_t, errors)
    }
  }
}
