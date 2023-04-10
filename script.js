const turgut = document.querySelector("#turgut");
const prohibitedColors = ["#2038ec", "#00a800", "#c84c0c"];
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const map = document.querySelector("#map");
ctx.imageSmoothingEnabled = false;
let counterWalk = 0;
let counterAxeX = 800;
let counterAxeY = 300;
let turgetX = turgut.style.left;
let turgetY = turgut.style.top;
const mapHeight = map.clientHeight;
const mapWidth = map.clientWidth;
let screenX = window.visualViewport.height / 6;
let screenY = window.visualViewport.width / 6;

function turgutCamera() {
  turgut.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
  let screenX = window.visualViewport.height / 6;
  let screenY = window.visualViewport.width / 6;
  const stickyBar = document.querySelector("#stickyBar");
  stickyBar.style.width = `${screenY - 1}px`;
  stickyBar.style.bottom = `${screenX - 21}px`;
}

function directionsAnimationsCollisionsOfTurgut() {
  document.querySelector("html").style.overflow = "hidden";
  document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
      turgutCamera();
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
      turgutCamera();
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
      turgutCamera();
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
      turgutCamera();
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
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeY = counterAxeY + 2;
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
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeY = counterAxeY + 2;
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
      const y = Math.floor(
        turgutRect.y + 16 - canvas.getBoundingClientRect().y
      );
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeY = counterAxeY - 2;
        turgut.style.top = `${counterAxeY}` + "px";
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x + 2 - canvas.getBoundingClientRect().x);
      const y = Math.floor(
        turgutRect.y + 16 - canvas.getBoundingClientRect().y
      );
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeY = counterAxeY - 2;
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
      const y = Math.floor(turgutRect.y + 2 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeX = counterAxeX + 2;
        turgut.style.left = `${counterAxeX}` + "px";
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(turgutRect.x - 3 - canvas.getBoundingClientRect().x);
      const y = Math.floor(
        turgutRect.y + 13 - canvas.getBoundingClientRect().y
      );
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeX = counterAxeX + 2;
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
      const x = Math.floor(
        turgutRect.x + 13 - canvas.getBoundingClientRect().x
      );
      const y = Math.floor(
        turgutRect.y + 13 - canvas.getBoundingClientRect().y
      );
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeX = counterAxeX - 2;
        turgut.style.left = `${counterAxeX}` + "px";
        directionCameraX = 1;
        directionCameraY = 1;
      }
    }

    detecteCouleur1();
    function detecteCouleur2() {
      const x = Math.floor(
        turgutRect.x + 13 - canvas.getBoundingClientRect().x
      );
      const y = Math.floor(turgutRect.y + 2 - canvas.getBoundingClientRect().y);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

      function rgbToHex(r, g, b) {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      }

      if (prohibitedColors.includes(hexColor)) {
        counterAxeX = counterAxeX - 2;
        turgut.style.left = `${counterAxeX}` + "px";
      }
    }

    detecteCouleur2();
  };
  img.src = "./map/mapTurgut.png";
}

// Fonction de lancement du jeu
function gameInit() {
  directionsAnimationsCollisionsOfTurgut();
  turgutCamera()


}
gameInit();
