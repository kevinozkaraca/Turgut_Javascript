const turgut = document.querySelector("#turgut");
const map = document.querySelector("#map");
const prohibitedColors = ["#2038ec", "#00a800", "#c84c0c"];
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const turgutLink = document.querySelector("#turgutLink");
let counterWalk = 0;
let counterAxeX = 800;
let counterAxeY = 300;

function directionAnimation() {
  document.addEventListener("keydown", (e) => {
    // Conditions pour ne pas sortir de la carte
    if (counterAxeX <= 2) {
      counterAxeX = 4;
    }
    if (counterAxeX >= 1372) {
      counterAxeX = 1370;
    }
    if (counterAxeY <= 2) {
      counterAxeY = 4;
    }
    if (counterAxeY >= 689) {
      counterAxeY = 687;
    }
    // Conditions pour se déplacer
    if (e.code === "KeyW") {
      collisionUp();
      turgut.style.backgroundImage = "url('./playerImages/turgutAnimUp1.png')";
      turgut.style.top = `${counterAxeY}` + "px";
      counterAxeY = counterAxeY - 2;
      counterWalk++;
      if (
        turgut.style.backgroundImage ==
        "url('./playerImages/turgutAnimUp1.png')" ||
        counterWalk > 3
      ) {
        turgut.style.backgroundImage =
          "url('./playerImages/turgutAnimUp2.png')";
        if (counterWalk > 6) {
          counterWalk = 0;
        }
      }
    }
    if (e.code === "KeyS") {
      collisionDown();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimDown1.png')";
      turgut.style.top = `${counterAxeY}` + "px";
      counterAxeY = counterAxeY + 2;
      counterWalk++;
      if (
        turgut.style.backgroundImage ==
        "url('./playerImages/turgutAnimDown1.png')" ||
        counterWalk > 3
      ) {
        turgut.style.backgroundImage =
          "url('./playerImages/turgutAnimDown2.png')";
        if (counterWalk > 6) {
          counterWalk = 0;
        }
      }
    }
    if (e.code === "KeyA") {
      collisionLeft();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimLeft1.png')";

      turgut.style.left = `${counterAxeX}` + "px";
      counterAxeX = counterAxeX - 2;
      counterWalk++;

      if (
        turgut.style.backgroundImage ==
        "url('./playerImages/turgutAnimLeft1.png')" ||
        counterWalk > 3
      ) {
        turgut.style.backgroundImage =
          "url('./playerImages/turgutAnimLeft2.png')";
        if (counterWalk > 6) {
          counterWalk = 0;
        }
      }
    }
    if (e.code === "KeyD") {
      collisionRight();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimRight1.png')";

      turgut.style.left = `${counterAxeX}` + "px";
      counterAxeX = counterAxeX + 2;
      counterWalk++;
      if (
        turgut.style.backgroundImage ==
        "url('./playerImages/turgutAnimRight1.png')" ||
        counterWalk > 3
      ) {
        turgut.style.backgroundImage =
          "url('./playerImages/turgutAnimRight2.png')";
        if (counterWalk > 6) {
          counterWalk = 0;
        }
      }
    }
  });
  // Changement de l'image à l'arret
  document.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") {
      collisionUp();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimUpStay.png')";
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyS") {
      collisionDown();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimDownStay.png')";
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyA") {
      collisionLeft();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimLeftStay.png')";
      turgut.style.left = `${counterAxeX}` + "px";
    }
    if (e.code === "KeyD") {
      collisionRight();
      turgut.style.backgroundImage =
        "url('./playerImages/turgutAnimRightStay.png')";
      turgut.style.left = `${counterAxeX}` + "px";
    }
  });
}

// Collision Haut
function collisionUp() {
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const turgutDiv = document.getElementById("turgut");
    const turgutRect = turgutDiv.getBoundingClientRect();

    function detecteCouleur1() {
      const x = Math.floor(turgutRect.x + 8 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Haut");
        counterAxeY = counterAxeY + 2
        turgut.style.top = `${counterAxeY}` + "px";
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x + 2 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Haut");
        counterAxeY = counterAxeY + 2
        turgut.style.top = `${counterAxeY}` + "px";
      }
    }

    detecteCouleur2();
  };
  img.src = "./map/mapTurgut.png";
}
// Collision Bas
function collisionDown() {
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const turgutDiv = document.getElementById("turgut");
    const turgutRect = turgutDiv.getBoundingClientRect();

    function detecteCouleur1() {
      const x = Math.floor(turgutRect.x + 8 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 16 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Bas");
        counterAxeY = counterAxeY - 2
        turgut.style.top = `${counterAxeY}` + "px";
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x + 2 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 16 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Bas");
        counterAxeY = counterAxeY - 2
        turgut.style.top = `${counterAxeY}` + "px";
      }
    }

    detecteCouleur2();
  };
  img.src = "./map/mapTurgut.png";
}
// Collision Gauche
function collisionLeft() {
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const turgutDiv = document.getElementById("turgut");
    const turgutRect = turgutDiv.getBoundingClientRect();

    function detecteCouleur1() {
      const x = Math.floor(turgutRect.x - 3 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 5 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Gauche");
        counterAxeX = counterAxeX + 2
        turgut.style.left = `${counterAxeX}` + "px";
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x - 3 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 10 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Gauche");
        counterAxeX = counterAxeX + 2
        turgut.style.left = `${counterAxeX}` + "px";
      }
    }

    detecteCouleur2();
  };
  img.src = "./map/mapTurgut.png";
}
// Collision Droite
function collisionRight() {
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const turgutDiv = document.getElementById("turgut");
    const turgutRect = turgutDiv.getBoundingClientRect();

    function detecteCouleur1() {
      const x = Math.floor(turgutRect.x + 13 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 10 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Droite");
        counterAxeX = counterAxeX - 2
        turgut.style.left = `${counterAxeX}` + "px";

      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x + 13 - canvas.getBoundingClientRect().x);
      const y = Math.floor(turgutRect.y + 5 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      if (prohibitedColors.includes(hexColor)) {
        console.log("collision Droite");
        counterAxeX = counterAxeX - 2
        turgut.style.left = `${counterAxeX}` + "px";
      }
    }

    detecteCouleur2();
  };
  img.src = "./map/mapTurgut.png";
}

// Fonction de lancement du jeu
function gameInit() {
  directionAnimation();
}
gameInit();
