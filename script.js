import responsiveCanvas from "./functions/responsiveCanvas.js";
import { ctx } from "./functions/responsiveCanvas.js";
// Mise a jour de la taille du jeu (Responsive)
responsiveCanvas();
// Vitesse du rafraichissement
let fps = 60;
ctx.imageSmoothingEnabled = false;
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
// Images
let turgut1 = new Image();
turgut1.src = "./playerImages/turgut1.png";
let gameMap = null;
let hud = new Image();
hud.src = "./gameImages/pauseScreen.png";
let chars1 = new Image();
chars1.src = "./gameImages/pnjs1.png";
let chars2 = new Image();
chars2.src = "./gameImages/pnjs2.png";
let retroFont = new FontFace("retroFont", "./fontWeb/retro2.ttf");
let joypadDetection = 0;
// gestion du menu entete
let lastPickUpItem = 0;
let playPickUpItemAnimation = false;
let rupeeAmount = 0;
let linkHearts = 5;
let currentLinkHearts = 2.5;
let keyAmount = 1;
let bombAmount = 5;
let swordEquipped = 0;
// Son et music
let BGMturgut = new Audio("./music/BGM.wav");
let pickUpItemSound = new Audio("./music/pickUpItemSound.wav");
// Tableau des cartes du jeu
let gameObjects = [];
let maps = [];
// Fonction de base du clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Mettre la fonction de la manette ici

// Fonction du gyroscope
let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
  console.log(e);
  console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
  console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
  console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
  let gyroX = document.getElementById("gyroX");
  let gyroY = document.getElementById("gyroY");
  let gyroZ = document.getElementById("gyroZ");
  gyroX.textContent = `X : ${gyroscope.x}`;
  gyroY.textContent = `Y : ${gyroscope.y}`;
  gyroZ.textContent = `Z : ${gyroscope.z}`;
});

function GameObject() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.newMap = 0;
  this.newLinkX = -1;
  this.newLinkY = -1;
  this.isPortal = false;
  this.counter = 0;
  this.imageNum = 0;
  this.isText = false;
  this.line1Full = "";
  this.line2Full = "";
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
  this.isOldWoman = false;
  this.pickUpItemName = "";
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
  if (playPickUpItemAnimation) {
    console.log("play pickupanimation");
    animationCounter++;
    if (animationCounter < 300) {
      ctx.drawImage(turgut1, 1, 150, 16, 16, turgutX, turgutY, 16, 16);
    } else {
      playPickUpItemAnimation = false;
    }
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
    switch (lastPickUpItem) {
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
        break;
      case 14:
        ctx.drawImage(hud, 555, 137, 8, 16, turgutX - 2, turgutY - 14, 8, 16);
        break;
    }
  } else {
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
        ctx.drawImage(turgut1, 91, 0, 16, 16, turgutX, turgutY, 16, 16);
      }
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
gO.line1Full = "C'EST UNE COPIE DE ZELDA !";
gO.line2Full = "TU N'AS PAS HONTE ?!";
gO.line1X = 3 * 16;
gO.line1Y = 7 * 16;
gO.line2X = 4 * 16;
gO.line2Y = 8 * 16 - 6;
gameObjectsWoodSword.push(gO);

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

        if (objects[i].isPickUpItem) {
          playPickUpItemAnimation = true;
          switch (gameObjects[i].pickUpItemNum) {
            case 0:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 1:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 2:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 3:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 4:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 5:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 6:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 7:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 8:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 9:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 10:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 11:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 12:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 13:
              gO = new GameObject();
              gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
              inventoryItems[gameObjects[i].pickUpItemNum] = gO;
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              break;
            case 14:
              lastPickUpItem = gameObjects[i].pickUpItemNum;
              swordEquipped = 1;
              animationCounter = 0;
              pickUpItemSound.play();
              console.log("épée équipé");
          }

          objects.splice(i, 1);
          animationCounter = 0;
        }
      }
    }
  }
}
function playSound(source) {
  let sound = new Audio();
  sound.src = source;
  sound.play();
}
function drawGameObjects() {
  for (let i = 0; i < gameObjects.length; i++) {
    if (gameObjects[i].isPickUpItem) {
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
          //Arc
          ctx.drawImage(hud, 633, 137.1, 8, 15.9, gameObjects[i].x, gameObjects[i].y, 8, 16);
          break;
        case 14:
          // épée bois
          ctx.drawImage(hud, 555, 137.1, 8, 15.9, gameObjects[i].x, gameObjects[i].y, 8, 16);
          break;
      }
    }
    if (gameObjects[i].isText) {
      gameObjects[i].counter += 1;
      if (gameObjects[i].counter % 5 == 0) {
        if (gameObjects[i].line1Full.length != gameObjects[i].line1Current.length) {
          gameObjects[i].line1Current = gameObjects[i].line1Full.substring(0, gameObjects[i].line1Current.length + 1);
          playSound("./music/textSound.wav");
        } else if (gameObjects[i].line2Full.length != gameObjects[i].line2Current.length) {
          gameObjects[i].line2Current = gameObjects[i].line2Full.substring(0, gameObjects[i].line2Current.length + 1);
          playSound("./music/textSound.wav");
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
        ctx.drawImage(chars2, 158, 11.1, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
      } else {
        ctx.drawImage(chars1, 52, 11.1, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
      }
    }
    if (gameObjects[i].isOldMan) {
      ctx.drawImage(chars1, 1, 11.1, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
    }
    if (gameObjects[i].isOldWoman) {
      ctx.drawImage(chars1, 35, 11.1, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
    }
  }
}
// Fontion du menu entete
function drawHUD() {
  ctx.drawImage(hud, 258, 11, 256, 56, 0, 0, 256, 56);

  ctx.fillStyle = "black";
  ctx.fillRect(175.9, 31.9, 64.1, 18);

  let fullHearts = Math.floor(currentLinkHearts);
  let halfHearts = currentLinkHearts - fullHearts;

  for (let i = 0; i < linkHearts; i++) {
    let heartY = 40;
    let heartX = 176 + i * 8;
    if (i > 7) {
      heartY = 40 - 8;
      heartX -= 64;
    }
    ctx.drawImage(hud, 627, 117, 8, 8, heartX, heartY, 8, 8);
  }
  let halfHeartX = 0;
  let halfHeartY = 0;
  for (let i = 0; i < fullHearts; i++) {
    let heartY = 40;
    let heartX = 176 + i * 8;
    if (i > 7) {
      heartY = 40 - 8;
      heartX -= 64;
    }
    ctx.drawImage(hud, 645, 117, 8, 8, heartX, heartY, 8, 8);
    if (i == fullHearts - 1) {
      if (i > 6) {
        halfHeartY = 40 - 8;
        halfHeartX = 176 + (i % 7) * 8;
      } else {
        halfHeartY = 40;
        halfHeartX = 176 + i * 8 + 8;
      }
    }
  }
  if (halfHearts > 0 && fullHearts >= 1) {
    ctx.drawImage(hud, 636, 117, 8, 8, halfHeartX, halfHeartY, 8, 8);
  } else if (halfHearts > 0 && fullHearts == 0) {
    ctx.drawImage(hud, 636, 117, 8, 8, 176, 40, 8, 8);
  }
  ctx.fillStyle = "black";
  ctx.fillRect(96, 10, 24, 50);

  if (rupeeAmount < 100) {
    ctx.drawImage(hud, 519, 117, 8, 8, 96, 16, 8, 8);
    let firstNum = rupeeAmount % 10;
    ctx.drawImage(hud, 528 + 8 * firstNum + firstNum, 117, 8, 8, 96 + 16, 16, 8, 8);
    let secondNum = Math.floor(rupeeAmount / 10);
    ctx.drawImage(hud, 528 + 8 * secondNum + secondNum, 117, 8, 8, 96 + 8, 16, 8, 8);
  } else {
    let firstNum = rupeeAmount % 10;
    ctx.drawImage(hud, 528 + 8 * firstNum + firstNum, 117, 8, 8, 96 + 16, 16, 8, 8);
    let thirdNum = Math.floor(rupeeAmount / 100) * 100;
    let secondNum = (rupeeAmount - thirdNum - firstNum) / 10;
    ctx.drawImage(hud, 528 + 8 * secondNum + secondNum, 117, 8, 8, 96 + 8, 16, 8, 8);
    thirdNum = Math.floor(rupeeAmount / 100);
    ctx.drawImage(hud, 528 + 8 * thirdNum + thirdNum, 117, 8, 8, 96, 16, 8, 8);
  }

  ctx.drawImage(hud, 519, 117, 8, 8, 96, 32, 8, 8);
  ctx.drawImage(hud, 519, 117, 8, 8, 96, 41, 8, 8);
  ctx.drawImage(hud, 528 + 8 * keyAmount + keyAmount, 117, 8, 8, 96 + 8, 32, 8, 8);
  ctx.drawImage(hud, 528 + 8 * bombAmount + bombAmount, 117, 8, 8, 96 + 8, 41, 8, 8);

  ctx.fillRect(128, 24, 8.1, 16.1);
  ctx.fillRect(152, 24, 8, 16);
  if (swordEquipped == 1) {
    ctx.drawImage(hud, 555, 137.1, 8, 15.9, 152, 24, 8, 16);
  }

  ///map fill gray
  ctx.fillStyle = "gray";
  ctx.fillRect(16, 8, 64, 48);
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
    drawHUD();
    gameObjectCollision(turgutX, turgutY, gameObjects, true);
    drawGameObjects();
    // Music  du jeu
    //BGMturgut.play();
    gyroscope.start();
  }, 1000 / fps);
}
draw();
