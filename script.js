const turgut = document.querySelector("#turgut");
const map = document.querySelector("#map");
const prohibitedColors = ["#2038Ec", "#00a800", "#c84c0c"]
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
ctx.getContextAttributes().willReadFrequently = true;
let counterAxeX = 800;
let counterAxeY = 300;

function directionAnimation() {

  document.addEventListener("keydown", (e) => {
    collision()
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
      counterAxeY--;
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyS") {
      counterAxeY++;
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyA") {
      counterAxeX--;
      turgut.style.left = `${counterAxeX}` + "px";
    }
    if (e.code === "KeyD") {
      counterAxeX++;
      turgut.style.left = `${counterAxeX}` + "px";
    }
  });
  // Changement de l'image à l'arret
  document.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") {
      counterAxeY--;
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyS") {
      counterAxeY++;
      turgut.style.top = `${counterAxeY}` + "px";
    }
    if (e.code === "KeyA") {
      counterAxeX--;
      turgut.style.left = `${counterAxeX}` + "px";
    }
    if (e.code === "KeyD") {
      counterAxeX++;
      turgut.style.left = `${counterAxeX}` + "px";
    }
  });

}

directionAnimation();

function collision() {
  // Collision
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };
  img.src = './map/mapTurgut.png';

  const turgutDiv = document.getElementById('turgut');
  const turgutRect = turgutDiv.getBoundingClientRect();

  function detecteCouleur() {
    const x = turgutRect.x - canvas.getBoundingClientRect().x;
    const y = turgutRect.y - canvas.getBoundingClientRect().y;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    console.log(hexColor)
    // DEBEUGER ICI !!!
    if (hexColor == prohibitedColors[1]) {
      console.log("object")
    }
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  detecteCouleur();

}

