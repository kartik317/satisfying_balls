const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 22; // minus 22 because of play button
const c = canvas.getContext("2d");
const touch = {
  x: null,
  y: null
}
const colorArray = ['#36BFB1', '#038C73', '#02735E', '#014034', '#234578', '#014034', '#0D0D0D'];
const maxRadius = 150;
const minRadius = 20;
const speed = 5;

class Create_ball {
  constructor(x, y, x_vel, y_vel, radius, color) {
    this.x = x;
    this.y = y;
    this.x_vel = x_vel;
    this.y_vel = y_vel;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }
  update() {
    this.x += this.x_vel;
    this.y += this.y_vel;

    if (this.x + this.radius > canvas.width || this.x < this.radius) {
      this.x_vel = -this.x_vel;
    }
    if (this.y + this.radius > canvas.height || this.y < this.radius) {
      this.y_vel = -this.y_vel;
    }
    // hendle size with respect to touch movement 
    if(touch.x - this.x < 100 && touch.x - this.x > -100 && touch.y - this.y < 100 && touch.y - this.y > -100){
      if(this.radius < maxRadius){
        this.radius += speed;
      }
    }
    else if(this.radius > minRadius){
      this.radius -= (speed-1);
    }
    this.draw();
  }
}

const playButton = document.getElementById("playButton");
const audio = document.getElementById("myAudio");

playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "Pause";
    } else {
        audio.pause();
        playButton.textContent = "Play";
    }
});

function generateBall(number){
  const radius = 20;
  for(let i = 0; i < number; i++){
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
    let y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
    let x_vel = (Math.random() * -0.5);
    let y_vel = (Math.random() * -0.5);
    let ball = new Create_ball(x, y, x_vel, y_vel, radius, color);
    balls.push(ball);
  }
}
const balls = [];
generateBall(1000);

window.addEventListener("touchmove", event => {
  touch.x = event.touches[0].clientX;
  touch.y = event.touches[0].clientY;
  //console.log(touch.x, touch.y);
})

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Animate all balls
  balls.forEach((ball) => ball.update());
}

animate();