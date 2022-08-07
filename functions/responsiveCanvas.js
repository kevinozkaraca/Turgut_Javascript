let canvasResponsive = document.getElementById("canvasResponsive");
let ctx = canvasResponsive.getContext("2d");

let windowsWidthScreen = window.innerWidth;
let windowHeightScreen = window.innerHeight;
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
export { canvasResponsive, ctx };
export default responsiveCanvas;
