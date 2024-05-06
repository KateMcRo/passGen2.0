// Consts for Character Options
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const special = "~!@#$%^&*()_+`-=";

// DOM Elements
const anchor = document.getElementById("anchor");
const eyes = document.querySelectorAll(".eye");
const passwordText = document.querySelector("#password");
const form = document.querySelector("form");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

// Event Listeners
document.addEventListener("mousemove", handleMouseMove);
document.querySelectorAll('[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckChange);
});
form.addEventListener("submit", handleFormSubmit);
copyButton.addEventListener("click", handleCopy);

// Functions
function handleMouseMove(e) {
  const rekt = anchor.getBoundingClientRect();
  // Calculates the center of wiz img
  const anchorX = rekt.left + rekt.width / 2;
  const anchorY = rekt.top + rekt.height / 2;
  // Capture current mouse coordinates
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  // Calculates angle between pointer and center of wiz img using angle function below
  const angelDeg = angle(mouseX, mouseY, anchorX, anchorY);
  // Rotates eye imgs based on calculated angle
  eyes.forEach((eye) => {
    eye.style.transform = `rotate(${90 + angelDeg}deg)`;
  });
}

// Super smart guy trig function
function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}

// Form
function handleFormSubmit(e) {
  e.preventDefault();
  // Where all password options will be held
  const passOptions = getSelection();
  const passLength = getLength();
  generatePass(passOptions, passLength);
}

function handleCheckChange() {
  generateButton.disabled = !checkCheck();
}

function handleCopyChange() {
  if (passwordText.value !== "") {
    // If not empty, remove the disabled attribute from the copy button
    copyButton.removeAttribute("disabled");
  } else {
    // If empty, disable the copy button
    copyButton.setAttribute("disabled", "disabled");
  }
}

function getSelection() {
  let options = "";
  document.querySelectorAll('[type="checkbox"]').forEach((item) => {
    if (item.checked === true) {
      if (item.value === "uppercase") {
        options += uppercase;
      }
      if (item.value === "lowercase") {
        options += lowercase;
      }
      if (item.value === "number") {
        options += number;
      }
      if (item.value === "special") {
        options += special;
      }
    }
  });
  return options;
}

function getLength() {
  const passLength = document.getElementById("length");
  length = passLength.value;
  return length;
}

function checkCheck() {
  return [...document.querySelectorAll('[type="checkbox"]')].some(
    (checkbox) => checkbox.checked
  );
}

function generatePass(options, length) {
  var generatedPass = "";

  Array.from({ length: length }).forEach(() => {
    var randomNumber = Math.floor(Math.random() * options.length);
    var randomCharacter = options[randomNumber];
    generatedPass += randomCharacter;
  });

  passwordText.value = generatedPass;
  handleCopyChange();
}

async function handleCopy() {
  try {
    const copyText = document.getElementById("password");
    await navigator.clipboard.writeText(copyText.value);
    alert(`Copied Password: ` + copyText.value);
  } catch (error) {
    console.error("Error copying password:", error);
  }
}
