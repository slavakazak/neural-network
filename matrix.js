class Matrix {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = [...Array(rows)].map(() => Array(cols).fill(0))
  }
  map(fn) {
    this.data = this.data.map((row, i) => row.map((a, j) => fn(a, i, j)))
    return this
  }
  static map(matrix, fn) {
    const result = new Matrix(matrix.rows, matrix.cols)
    result.data = matrix.data.map((row, i) => row.map((a, j) => fn(a, i, j)))
    return result
  }
  print = () => console.table(this.data)
  static fromArray = array => new Matrix(array.length, 1).map((_, i) => array[i])
  toArray() {
    const array = []
    this.data.forEach(row => row.forEach(a => array.push(a)))
    return array
  }
  randomize = () => this.map(() => Math.random() * 2 - 1)
  static transpose = a => new Matrix(a.cols, a.rows).map((_, i, j) => a.data[j][i])
  static sum = (a, b) => new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] + b.data[i][j])
  add = n => n instanceof Matrix ? this.map((a, i, j) => a + n.data[i][j]) : this.map(a => a + n)
  static subtract = (a, b) => new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j])
  static multiply = (a, b) => a.cols == b.rows ? new Matrix(a.rows, b.cols).map((_, i, j) => a.data[i].reduce((acc, curr, k) => acc + curr * b.data[k][j], 0)) : undefined
  multiply = n => n instanceof Matrix ? this.map((a, i, j) => a * n.data[i][j]) : this.map(a => a * n)
}