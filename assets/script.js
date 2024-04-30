// Wiz img
const anchor = document.getElementById("anchor");
const rekt = anchor.getBoundingClientRect();
// Calculates the center of wiz img
const anchorX = rekt.left + rekt.width / 2;
const anchorY = rekt.top + rekt.height / 2;

const eyes = document.querySelectorAll(".eye");

document.addEventListener("mousemove", (e) => {
  // Capture current mouse coordinates
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Calculates angle between pointer and center of wiz img using angle function below
  const angelDeg = angle(mouseX, mouseY, anchorX, anchorY);

  // Rotates eye imgs based on calculated angle
  eyes.forEach((eye) => {
    eye.style.transform = `rotate(${90 + angelDeg}deg)`;
  });
});

// Super smart guy trig function
function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}
