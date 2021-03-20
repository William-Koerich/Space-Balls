var w = window
var c = canvas.getContext('2d')
let width = w.innerWidth
let height = w.innerHeight
canvas.width = width
canvas.height = height

var gravity = 0.85
c.strokeWidth = 5
function randomColor() {
  return (
    'rgba(' +
    Math.round(Math.random() * 999) +
    ',' +
    Math.round(Math.random() * 9999) +
    ',' +
    Math.round(Math.random() * 9999) +
    ',' +
    Math.ceil(Math.random() * 1000) / 10 +
    ')'
  )
}

function Ball() {
  this.color = randomColor()
  this.radius = Math.random() * 20 + 30
  this.startRadius = this.radius
  this.axisX = Math.random() * (width - this.radius * 2) + this.radius
  this.axisY = Math.random() * (height - this.radius)
  this.diameterY = Math.random() * 2
  this.diameterX = Math.round((Math.random() - 0.5) * 10)
  this.velocity = Math.random() / 5
  this.generateBall = function () {
    c.beginPath()
    c.arc(this.axisX, this.axisY, this.radius, 0, 2 * Math.PI)
    c.fillStyle = this.color
    c.fill()
  }
}

var arrayBalls = []
$('#generate-button').click(() => {
  arrayBalls.push(new Ball())
})

function animationBalls() {
  if (width != window.innerWidth || height != window.innerHeight) {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }
  /**
   * Limpa o caminho da bola.
   */
  c.clearRect(0, 0, width, height)

  for (let i = 0; i < arrayBalls.length; i++) {
    /**
     * Ester egg.
     */
    if (arrayBalls.length === 45) {
      $('#generate-button').html('🚀🚀🚀🚀')
      gravity = 1
    }

    arrayBalls[i].generateBall()
    arrayBalls[i].axisY += arrayBalls[i].diameterY
    arrayBalls[i].axisX += arrayBalls[i].diameterX
    if (arrayBalls[i].axisY + arrayBalls[i].radius >= height) {
      arrayBalls[i].diameterY = -arrayBalls[i].diameterY * gravity
    } else {
      arrayBalls[i].diameterY += arrayBalls[i].velocity
    }
    if (
      arrayBalls[i].axisX + arrayBalls[i].radius > width ||
      arrayBalls[i].axisX - arrayBalls[i].radius < 0
    ) {
      arrayBalls[i].diameterX = -arrayBalls[i].diameterX
    }
  }

  requestAnimationFrame(animationBalls)
}

animationBalls()
