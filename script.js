const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  lane: 1,
  width: 50,
  height: 50,
  y: 350,
  spriteX: 0,
  frame: 0
};

let lanes = [250, 350, 450];
let obstacles = [];
let coins = [];
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let isRunning = false;
let gameOver = false;
let gameSpeed = 6;

// Bilder
const playerImg = new Image();
playerImg.src = "assets/images/player_female_run.png";

// Sounds
const jumpSound = new Audio("assets/sounds/jump.mp3");
const coinSound = new Audio("assets/sounds/coin.mp3");
const music = new Audio("assets/sounds/music.mp3");
music.loop = true;
music.volume = 0.4;

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  isRunning = true;
  gameOver = false;
  score = 0;
  obstacles = [];
  coins = [];
  music.play();
  requestAnimationFrame(gameLoop);
  setInterval(spawnObjects, 1500);
}

function spawnObjects() {
  const lane = Math.floor(Math.random() * 3);
  if (Math.random() < 0.5) {
    coins.push({ x: 800, y: lanes[lane], width: 20, height: 20 });
  } else {
    obstacles.push({ x: 800, y: lanes[lane], width: 40, height: 40 });
  }
}

function update() {
  if (!isRunning || gameOver) return;

  obstacles.forEach(o => o.x -= gameSpeed);
  coins.forEach(c => c.x -= gameSpeed);

  obstacles = obstacles.filter(o => o.x + o.width > 0);
  coins = coins.filter(c => c.x + c.width > 0);

  coins.forEach((c, i) => {
    if (Math.abs(c.x - 100) < 30 && c.y === lanes[player.lane]) {
      score += 10;
      coinSound.play();
      coins.splice(i, 1);
    }
  });

  obstacles.forEach(o => {
    if (Math.abs(o.x - 100) < 40 && o.y === lanes[player.lane]) {
      gameOver = true;
      isRunning = false;
      music.pause();
      if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
      }
    }
  });

  // Laufanimation
  player.frame++;
  if (player.frame % 5 === 0) {
    player.spriteX += 50;
    if (player.spriteX >= 300) player.spriteX = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Wege zeichnen
  ctx.fillStyle = "#0a0";
  lanes.forEach(y => ctx.fillRect(0, y + 45, canvas.width, 5));

  // Spielfigur
  ctx.drawImage(playerImg, player.spriteX, 0, 50, 50, 100, lanes[player.lane], player.width, player.height);

  // Coins
  ctx.fillStyle = "gold";
  coins.forEach(c => ctx.fillRect(c.x, c.y, c.width, c.height));

  // Hindernisse
  ctx.fillStyle = "red";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));

  // Score anzeigen
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score + " | Highscore: " + highscore, 20, 30);

  // Game Over Text
  if (gameOver) {
    ctx.fillStyle = "yellow";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 300, 200);
  }
}

function gameLoop() {
  update();
  draw();
  if (isRunning) requestAnimationFrame(gameLoop);
}

// Touch-Gesten für Links/Rechts
let startX = 0;
canvas.addEventListener("touchstart", e => startX = e.touches[0].clientX);
canvas.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50 && player.lane > 0) {
    player.lane--;
    jumpSound.play();
  } else if (startX - endX > 50 && player.lane < 2) {
    player.lane++;
    jumpSound.play();
  }
});
