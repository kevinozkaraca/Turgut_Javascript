// // mettre la fonction dans la boucle
// if (joypadDetection == 1) {
//   Joypad();
// }

// //Detection de la manette
// window.addEventListener("gamepadconnected", function (detect) {
//   let gp = navigator.getGamepads()[detect.gamepad.index];
//   if (GamepadEvent) {
//     console.log("Info : " + gp.id + " détécté avec " + gp.buttons.length + " buttons.");
//     console.log("Info : " + gp.id + " détécté avec " + gp.axes.length + " axes.");
//     joypadDetection = 1;
//   }
// });
// // Fonction de la manette (dans la boucle du jeu)
// function Joypad() {
//   let gp = navigator.getGamepads()[0];

//   if (GamepadEvent) {
//     joypadDetection = 1;
//     let axe1 = gp.axes[0];
//     let axe2 = gp.axes[1];
//     let axe3 = gp.axes[3];
//     let axe4 = gp.axes[2];
//     if (axe1 >= 0.7) {
//       rightPressed = true;
//       lastButtonPressed = "right";
//     }
//     if (axe4 >= 0.7) {
//       rightPressed = true;
//       lastButtonPressed = "right";
//     }
//     if (axe1 <= -0.7) {
//       leftPressed = true;
//       lastButtonPressed = "left";
//     }
//     if (axe4 <= -0.7) {
//       leftPressed = true;
//       lastButtonPressed = "left";
//     }
//     if (axe2 >= 0.7) {
//       downPressed = true;
//       lastButtonPressed = "down";
//     }
//     if (axe3 >= 0.7) {
//       downPressed = true;
//       lastButtonPressed = "down";
//     }
//     if (axe2 <= -0.7) {
//       upPressed = true;
//       lastButtonPressed = "up";
//     }
//     if (axe3 <= -0.7) {
//       upPressed = true;
//       lastButtonPressed = "up";
//     }
//     if (gp.buttons[0].pressed == true) {
//       console.log("Button A");
//       console.log(axe1, axe2, axe3, axe4);
//     }
//     if (gp.buttons[1].pressed == true) {
//       console.log("Button B");
//     }
//     if (gp.buttons[2].pressed == true) {
//       console.log("Button X");
//     }
//     if (gp.buttons[3].pressed == true) {
//       console.log("Button Y");
//     }
//     if (gp.buttons[4].pressed == true) {
//       console.log("Button LB");
//     }
//     if (gp.buttons[5].pressed == true) {
//       console.log("Button RB");
//     }
//     if (gp.buttons[6].pressed == true) {
//       console.log("Button LT");
//     }
//     if (gp.buttons[7].pressed == true) {
//       console.log("Button RT");
//     }
//     if (gp.buttons[8].pressed == true) {
//       console.log("Select");
//     }
//     if (gp.buttons[9].pressed == true) {
//       console.log("Start");
//     }
//     if (gp.buttons[10].pressed == true) {
//       console.log("Push sur la direction");
//     }
//     if (gp.buttons[11].pressed == true) {
//       console.log("Push sur l'iso");
//     }
//     if (gp.buttons[12].pressed == true) {
//       upPressed = true;
//       lastButtonPressed = "up";
//     }
//     if (gp.buttons[13].pressed == true) {
//       downPressed = true;
//       lastButtonPressed = "down";
//     }
//     if (gp.buttons[14].pressed == true) {
//       leftPressed = true;
//       lastButtonPressed = "left";
//     }
//     if (gp.buttons[15].pressed == true) {
//       rightPressed = true;
//       lastButtonPressed = "right";
//     }
//   }
// }
