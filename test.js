let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let curHue = 0
let dt = 1000 / 60
let currentTime = performance.now()
let accumulator = 0

setInterval(() => {
  let newTime = performance.now()
  let frameTime = newTime - currentTime
  currentTime = newTime
  accumulator += frameTime
  while (accumulator >= dt) {
    curHue -= 1
    if (curHue > 360) {
      curHue -= 360
    }
    accumulator -= dt
  }
}, 2)

function nextFrame() {
    return new Promise(resolve => {
        window.requestAnimationFrame(resolve)
    })
}

(async () => {
  for (;;) {
    let timeStamp = await nextFrame()
    
    ctx.fillStyle = '#142130'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    let gradient = ctx.createLinearGradient(0, 0, 1000, 0)
    gradient.addColorStop(0, `hsl(${curHue}, 100%, 50%)`)
    gradient.addColorStop(1, `hsl(${curHue + 80}, 100%, 50%)`)
    
    ctx.fillStyle = gradient
    ctx.font = "800 90px sans-serif";
    ctx.filter = 'blur(30px)';
    let text = globalThis.text ?? 'С Новым Годом!'
    ctx.fillText(text, 30, 180)
    ctx.filter = 'blur(0px)';
    ctx.fillText(text, 30, 180)
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // DEBUG
  }
})()



