const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = 0;
let y = 0;
let size = 20;

function shock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let i = 0; i < 7; i++) {
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  x += 5;
  y += 5;
  size += 5;
  if (x > canvas.width || y > canvas.height) {
    x = 0;
    y = 0;
    size = 20;
  }
  requestAnimationFrame(shock);
}
//shock();