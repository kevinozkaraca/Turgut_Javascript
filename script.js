// Vitesse du rafraichissement
let fps = 60;
// Mise a jour de la taille du jeu (Responsive)
let canvasResponsive = document.getElementById("canvasResponsive");
let ctx = canvasResponsive.getContext("2d");
let windowsWidthScreen = window.innerWidth;
let windowHeightScreen = window.innerHeight;

console.log(window.innerHeight);
function responsiveCanvas() {
  if (windowHeightScreen < windowsWidthScreen) {
    let scaleHeight = `${(windowHeightScreen - 10) / 256}`;
    canvasResponsive.width = 256 * scaleHeight;
    canvasResponsive.height = 240 * scaleHeight;
    ctx.scale(scaleHeight, scaleHeight);
  } else {
    let scaleWidth = `${(windowsWidthScreen - 10) / 256}`;
    canvasResponsive.width = 256 * scaleWidth;
    canvasResponsive.height = 240 * scaleWidth;
    ctx.scale(scaleWidth, scaleWidth);
  }
}
responsiveCanvas();

// Affichage du monde (découpage par la suite)
let worldTiles = new Image();
worldTiles.src = "./gameImages/tiles-overworld1.png";
// Variable de mouvements du personnage
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let animationCounter = 0;
let currentAnimation = 0;
let animationSpeed = 10;
let lastButtonPressed = "down";
// Position de départ du joueur
let turgutY = 135;
let turgutX = 116;
// Image conteenant les images du personnage
let turgut1 = new Image();
turgut1.src = "./playerImages/turgut1.png";
let gameObjects = [];
let maps = [];
let gameMap = null;

// Fonction de base du clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function GameObject() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.newMap = 0;
  this.newturgutX = 0;
  this.newturgutY = 0;
  this.isPortal = false;
}

function MapBundle(m, o) {
  this.map = m;
  this.gameobjects = o;
}

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

  if (leftPressed && !collision(turgutX - speed, turgutY, gameMap)) {
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
  } else if (rightPressed & !collision(turgutX + speed, turgutY, gameMap)) {
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
  } else if (upPressed & !collision(turgutX, turgutY - speed, gameMap)) {
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
  } else if (downPressed & !collision(turgutX, turgutY + speed, gameMap)) {
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
      ctx.drawImage(turgut1, 91, 30, 16, 16, turgutX, turgutY, 16, 16);
    }
  }
}

let map7_7 = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [61, 61, 61, 61, 61, 61, 61, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 61, 28, 61, 62, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 62, 02, 02, 02, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 62, 02, 02, 02, 02, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 62, 02, 02, 02, 02, 02, 02, 02, 60, 61, 61, 61, 61, 61, 61],
  [02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02],
  [43, 44, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 43, 43],
  [61, 61, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 61, 61],
  [61, 61, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 61, 61],
  [61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
  [61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61],
];
let objects7_7 = [];

let gO = new GameObject();
gO.x = 72;
gO.y = 72;
gO.width = 8;
gO.height = 16;
gO.newMap = 1;
gO.newturgutX = 120;
gO.newturgutY = 220;
gO.isPortal = true;
objects7_7.push(gO);

let bundle = new MapBundle(map7_7, objects7_7);
maps.push(bundle);

let mapWoodSword = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
  [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 37, 37, 37, 37, 37, 28, 28, 37, 37, 37, 37, 37, 55, 55],
  [55, 55, 55, 55, 55, 55, 55, 28, 28, 55, 55, 55, 55, 55, 55, 55],
];
let gameObjectsWoodSword = [];

gO = new GameObject();
gO.x = 112;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.newMap = 0;
gO.newturgutX = 68;
gO.newturgutY = 96;
gO.isPortal = true;
gameObjectsWoodSword.push(gO);

gO = new GameObject();
gO.x = 128;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.newMap = 0;
gO.newturgutX = 68;
gO.newturgutY = 96;
gO.isPortal = true;
gameObjectsWoodSword.push(gO);

bundle = new MapBundle(mapWoodSword, gameObjectsWoodSword);
maps.push(bundle);
gameMap = maps[0].map;
gameObjects = maps[0].gameobjects;

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
      if (map[i][j] != 2 && map[i][j] != 28) {
        if (x <= j * 16 + 16 && x + 12 >= j * 16 && y + 10 <= i * 16 + 16 && y + 16 >= i * 16) {
          return true;
        }
      }
    }
  }
  return false;
}

function gameObjectCollision(x, y, objects, isturgut) {
  if (isturgut) {
    for (let i = 0; i < objects.length; i++) {
      if (
        x <= objects[i].x + objects[i].width &&
        x + 16 >= objects[i].x &&
        y <= objects[i].y + objects[i].height &&
        y + 16 >= objects[i].y
      ) {
        if (objects[i].isPortal) {
          gameMap = maps[objects[i].newMap].map;
          gameObjects = maps[objects[i].newMap].gameobjects;
          turgutX = objects[i].newturgutX;
          turgutY = objects[i].newturgutY;
        }
      }
    }
  }
}

// Fonction d'affichage du jeu
function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);
    // fillRect() dessine un rectangle plein aux coordonnées (x, y)
    // et au style déterminé par l'attribut fillStyle
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 240);
    drawMap(gameMap);
    drawturgut();
    gameObjectCollision(turgutX, turgutY, gameObjects, true);
  }, 1000 / fps);
}

draw();
