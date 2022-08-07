import responsiveCanvas from "./functions/responsiveCanvas.js";
import { ctx } from "./functions/responsiveCanvas.js";
// Mise a jour de la taille du jeu (Responsive)
responsiveCanvas();
// Vitesse du rafraichissement
let fps = 60;
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
// Image contenant les images du personnage
let turgut1 = new Image();
turgut1.src = "./playerImages/turgut1.png";
let gameObjects = [];
let maps = [];
let gameMap = null;
let hud = new Image();
hud.src = "./gameImages/pauseScreen.png";
let chars1 = new Image();
chars1.src = "./gameImages/pnjs1.png";
let chars2 = new Image();
chars2.src = "./gameImages/pnjs2.png";
let retroFont = new FontFace("retroFont", "./fontWeb/retro2.ttf");
let joypadDetection = 0;
let lastPickUpItem = 0;
let playPickupItemAnimation = false;

// Fonction de base du clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Bug une fois la manette en marche avec le clavier

function GameObject() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.newMap = 0;
  this.newturgutX = 0;
  this.newturgutY = 0;
  this.isPortal = false;
  this.counter = 0;
  this.imageNum = 0;
  this.isText = false;
  this.line1Current = "";
  this.line2Current = "";
  this.line1X = 0;
  this.line1Y = 0;
  this.line2X = 0;
  this.line2Y = 0;
  this.isOldMan = false;
  this.isPickUpItem = false;
  this.pickUpItemNum = 0;
  this.isFlame = false;
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
  [61, 61, 61, 61, 61, 61, 61, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 61, 28, 61, 62, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 62, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 62, 2, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 62, 2, 2, 2, 2, 2, 2, 2, 60, 61, 61, 61, 61, 61, 61],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [43, 44, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 42, 43],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
  [61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61],
];

let gO = new GameObject();
gO.x = 72;
gO.y = 72;
gO.width = 8;
gO.height = 16;
gO.newMap = 1;
gO.newturgutX = 120;
gO.newturgutY = 220;
gO.isPortal = true;
let objects7_7 = [];
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
gO.x = 4 * 16 + 8;
gO.y = 8 * 16;
gO.width = 16;
gO.height = 16;
gO.newMap = 0;
gO.newturgutX = 68;
gO.newturgutY = 96;
gO.isPortal = true;
gameObjectsWoodSword.push(gO);

gO = new GameObject();
gO.x = 10 * 16 + 8;
gO.y = 8 * 16;
gO.width = 16;
gO.height = 16;
gO.isFlame = true;
gameObjectsWoodSword.push(gO);

gO = new GameObject();
gO.x = 7 * 16 + 8;
gO.y = 8 * 16;
gO.width = 16;
gO.height = 16;
gO.isOldMan = true;
gameObjectsWoodSword.push(gO);

gO = new GameObject();
gO.isText = true;
gO.line1Full = "JE JE... Heu !";
gO.line2Full = "C'est QUOI MON TEXTE ?!";
gO.line1X = 3 * 16;
gO.line1Y = 7 * 16;
gO.line2X = 4 * 16;
gO.line2Y = 8 * 16 - 6;
gameObjectsWoodSword.push(gO);

///Portal variables
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

//sword
gO = new GameObject();
gO.x = 8 * 16 - 4;
gO.y = 9.5 * 16;
gO.width = 8;
gO.height = 16;
gO.isPickUpItem = true;
gO.pickUpItemNum = 14;
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
        (level[i][j] % 18) * 17 + 1.5,
        Math.floor(level[i][j] / 18) * 17 + 1.5,
        16,
        16,
        j * 16,
        i * 16,
        17,
        17
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

function drawGameObjects() {
  for (let i = 0; i < gameObjects.length; i++) {
    if (gameObjects[i].isPickUpItem) {
      ///There are a number of pick up items. The first 8 are selectable within
      /// the inventory screen. The following 6 sit on top of the selectable inventory
      /// and are automatically equipped and used by link.
      //0 - boomerang
      //1 - bomb
      //2 - bow and arrow
      //3 - candle
      //4 - flute
      //5 - meat
      //6 - potion(red or blue)
      //7 - magic rod
      //8 - raft
      //9 - book of magic
      //10 - ring
      //11 - ladder
      //12 - key
      //13 - bracelet
      //14 - wood sword
      switch (gameObjects[i].pickUpItemNum) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;
        case 10:
          break;
        case 11:
          break;
        case 12:
          break;
        case 13:
          // épée bois
          ctx.drawImage(hud, 555, 137, 8, 16, gameObjects[i].x, gameObjects[i].y, 8, 16);
          break;
        case 14:
          //Arc
          ctx.drawImage(hud, 633, 137, 8, 16, gameObjects[i].x, gameObjects[i].y, 8, 16);

          break;
      }
    }
    if (gameObjects[i].isText) {
      gameObjects[i].counter += 1;
      if (gameObjects[i].counter % 5 == 0) {
        if (gameObjects[i].line1Full.length != gameObjects[i].line1Current.length) {
          gameObjects[i].line1Current = gameObjects[i].line1Full.substring(0, gameObjects[i].line1Current.length + 1);
        } else if (gameObjects[i].line2Full.length != gameObjects[i].line2Current.length) {
          gameObjects[i].line2Current = gameObjects[i].line2Full.substring(0, gameObjects[i].line2Current.length + 1);
        }
      }

      ctx.fillStyle = "white";
      ctx.font = `10px retro2`;

      ctx.fillText(gameObjects[i].line1Current, gameObjects[i].line1X, gameObjects[i].line1Y);
      ctx.fillText(gameObjects[i].line2Current, gameObjects[i].line2X, gameObjects[i].line2Y);
    }
    if (gameObjects[i].isFlame) {
      gameObjects[i].counter += 1;
      if (gameObjects[i].counter % 5 == 0) {
        gameObjects[i].imageNum += 1;
      }
      if (gameObjects[i].imageNum > 1) {
        gameObjects[i].imageNum = 0;
      }
      if (gameObjects[i].imageNum == 0) {
        ctx.drawImage(chars2, 158, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
      } else {
        ctx.drawImage(chars1, 52, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
      }
    }
    if (gameObjects[i].isOldMan) {
      ctx.drawImage(chars1, 1, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
    }
    if (gameObjects[i].isOldWoman) {
      ctx.drawImage(chars1, 35, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
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
    drawGameObjects();
  }, 1000 / fps);
}

draw();
