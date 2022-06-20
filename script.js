// Variables de la base du jeu
const fps = 60;
const ctx = canvas.getContext("2d");
const worldTiles = new Image();
worldTiles.src = "./gameImages/tiles-overworld.png";
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let animationCounter = 0;
let currentAnimation = 0;
let animationSpeed = 10;
let lastButtonPressed = "up";
let turgutY = 135;
let turgutX = 116;
let turgut1 = new Image();
turgut1.src = "./playerImages/turgut.png";

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
    lastButtonPressed = "left";
  } else if (e.keyCode == 39) {
    rightPressed = true;
    lastButtonPressed = "right";
  } else if (e.keyCode == 38) {
    upPressed = true;
    lastButtonPressed = "up";
  } else if (e.keyCode == 40) {
    downPressed = true;
    lastButtonPressed = "down";
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 40) {
    downPressed = false;
  }
}

function drawturgut() {
  let speed = 2;
  animationCounter++;

  if (leftPressed && !collision(turgutX - speed, turgutY, map7_7)) {
    turgutX -= speed;
    if (currentAnimation == 0) {
      ctx.drawImage(turgut1, 30, 0, 16, 16, turgutX, turgutY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(turgut1, 30, 30, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (rightPressed & !collision(turgutX + speed, turgutY, map7_7)) {
    turgutX += speed;
    if (currentAnimation == 0) {
      ctx.drawImage(turgut1, 91, 0, 16, 16, turgutX, turgutY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(turgut1, 91, 30, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (upPressed & !collision(turgutX, turgutY - speed, map7_7)) {
    turgutY -= speed;
    if (currentAnimation == 0) {
      ctx.drawImage(turgut1, 62, 0, 16, 16, turgutX, turgutY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(turgut1, 62, 30, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (downPressed & !collision(turgutX, turgutY + speed, map7_7)) {
    turgutY += speed;
    if (currentAnimation == 0) {
      ctx.drawImage(turgut1, 0, 0, 16, 16, turgutX, turgutY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(turgut1, 0, 30, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else {
    if (lastButtonPressed == "down") {
      ctx.drawImage(turgut1, 0, 0, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (lastButtonPressed == "up") {
      ctx.drawImage(turgut1, 62, 0, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (lastButtonPressed == "left") {
      ctx.drawImage(turgut1, 30, 0, 16, 16, turgutX, turgutY, 16, 16);
    }
    if (lastButtonPressed == "right") {
      ctx.drawImage(turgut1, 91, 0, 16, 16, turgutX, turgutY, 16, 16);
    }
  }
}

// Cartes du jeu
const map7_7 = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [61, 61, 61, 61, 61, 61, 61, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 61, 28, 61, 62, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 62, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 62, 2, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 62, 2, 2, 2, 2, 2, 2, 2, 60, 61, 61, 61, 61, 61, 61],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [43, 44, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 43],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
  [61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61],
];

function drawMap(level) {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      ctx.drawImage(
        worldTiles,
        (level[i][j] % 18) * 17 + 1,
        Math.floor(level[i][j] / 18) * 17 + 1,
        16,
        16,
        j * 16,
        i * 16,
        16,
        16
      );
    }
  }
}
function collision(x, y, map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] != 2) {
        if (x <= j * 16 + 16 && x + 12 >= j * 16 && y + 10 <= i * 16 + 16 && y + 16 >= i * 16) {
          return true;
        }
      }
    }
  }
  return false;
}

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 240);
    drawMap(map7_7);
  }, 1000 / fps);
  drawturgut();
}
draw();

// Zoom la taille du jeu (implémenter des bouttons)
document.body.style.zoom = "250%";
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
