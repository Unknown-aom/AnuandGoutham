const PASSWORD = "233020112010";
const rotatingLabels = [
  "my wifeyyy",
  "my beaniee",
  "my babyyy",
  "my chinnu",
  "my boss baby",
  "my best thing",
  "my bestfriend",
  "my goddess",
  "my happiness",
  "my Anu",
  "my best thing",
  "my bestfriend" ,
  "my goddesse"    ,          
  "my happiness",
  "my foreheaddd",
  "my first priority",
  "My hottie",
  "My princess", 
  "My biggest supporter",
  "My love",
  "my cuite",
  "My SECOND MOM,MOMMYYYY",
  "Good GOD I LOVEEE YOUUU",
];

const loginScreen = document.getElementById("loginScreen");
const entryScreen = document.getElementById("entryScreen");
const mainScreen = document.getElementById("mainScreen");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const loginHint = document.getElementById("loginHint");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const entryActions = document.getElementById("entryActions");
const rotatingText = document.getElementById("rotatingText");
const toast = document.getElementById("toast");
const tabButtons = [...document.querySelectorAll(".tab-btn")];
const panels = [...document.querySelectorAll(".content-panel")];
const particleLayer = document.getElementById("particleLayer");
const cursorGlow = document.getElementById("cursorGlow");
const appShell = document.getElementById("appShell");
const appFullscreenBtn = document.getElementById("appFullscreenBtn");
const playFrameShell = document.getElementById("playFrameShell");
const playFullscreenBtn = document.getElementById("playFullscreenBtn");
const frameBackdrop = document.getElementById("frameBackdrop");
const hoverPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

let rotateIndex = 0;
let toastTimer = null;
let playFullscreen = false;
let playAnimationFrame = 0;
let playPlaceholder = null;
let canDodgeNoButton = hoverPointerQuery.matches;

document.body.classList.add("app-locked");

function switchScreen(target) {
  [loginScreen, entryScreen, mainScreen].forEach((screen) => {
    const isTarget = screen === target;
    screen.classList.toggle("is-active", isTarget);
    screen.inert = !isTarget;
    screen.setAttribute("aria-hidden", String(!isTarget));
  });

  if (target === loginScreen && hoverPointerQuery.matches) {
    window.requestAnimationFrame(() => passwordInput.focus());
  }
}

function resetNoButtonPosition() {
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.right = "";
  noBtn.style.bottom = "";
  noBtn.style.transform = "";
}

function syncInteractionMode() {
  canDodgeNoButton = hoverPointerQuery.matches;
  entryActions.classList.toggle("is-touch-mode", !canDodgeNoButton);
  resetNoButtonPosition();
}

switchScreen(loginScreen);
syncInteractionMode();

if (typeof hoverPointerQuery.addEventListener === "function") {
  hoverPointerQuery.addEventListener("change", syncInteractionMode);
} else if (typeof hoverPointerQuery.addListener === "function") {
  hoverPointerQuery.addListener(syncInteractionMode);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function showInvalidPassword() {
  loginHint.textContent = "hmm... only my Anu knows this 😏❤️";
  passwordInput.classList.remove("shake");
  void passwordInput.offsetWidth;
  passwordInput.classList.add("shake");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value.trim() === PASSWORD) {
    loginHint.textContent = "";
    passwordInput.value = "";
    switchScreen(entryScreen);
    return;
  }
  showInvalidPassword();
});

yesBtn.addEventListener("click", () => {
  switchScreen(mainScreen);
  document.body.classList.remove("app-locked");
  showToast("hehehe ikkk my babyyyy mwahhh 😘");
});

function moveNoButton() {
  if (!canDodgeNoButton) {
    showToast("phone mode still says YES only 😘");
    return;
  }

  const bounds = entryActions.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(bounds.width - buttonRect.width - 12, 12);
  const maxY = Math.max(bounds.height - buttonRect.height - 12, 12);
  const nextX = 12 + Math.random() * (maxX - 12);
  const nextY = 12 + Math.random() * (maxY - 12);

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
  noBtn.style.right = "auto";
  noBtn.style.transform = "none";
}

entryActions.addEventListener("pointermove", (event) => {
  if (!canDodgeNoButton) {
    return;
  }

  const buttonRect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    event.clientX - (buttonRect.left + buttonRect.width / 2),
    event.clientY - (buttonRect.top + buttonRect.height / 2),
  );

  if (distance < 120) {
    moveNoButton();
  }
});

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

function rotateLabel() {
  rotateIndex = (rotateIndex + 1) % rotatingLabels.length;
  rotatingText.classList.remove("is-switching");
  void rotatingText.offsetWidth;
  rotatingText.textContent = rotatingLabels[rotateIndex];
  rotatingText.classList.add("is-switching");
}

window.setInterval(rotateLabel, 2200);

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.section;
    tabButtons.forEach((item) =>
      item.classList.toggle("is-active", item === button),
    );
    panels.forEach((panel) =>
      panel.classList.toggle("is-active", panel.dataset.panel === target),
    );
  });
});

function createParticles() {
  const particleCount = 28;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    const size = 3 + Math.random() * 8;
    const duration = 12 + Math.random() * 22;
    const delay = Math.random() * -duration;
    const startLeft = Math.random() * 100;
    const drift = -120 + Math.random() * 240;

    particle.className = "particle";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startLeft}%`;
    particle.style.bottom = `${-20 - Math.random() * 30}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.setProperty("--drift-x", `${drift}px`);
    fragment.appendChild(particle);
  }

  particleLayer.appendChild(fragment);
}

createParticles();

document.addEventListener("pointermove", (event) => {
  if (!hoverPointerQuery.matches) {
    return;
  }

  const x = `${event.clientX}px`;
  const y = `${event.clientY}px`;
  document.documentElement.style.setProperty("--cursor-x", x);
  document.documentElement.style.setProperty("--cursor-y", y);
  cursorGlow.style.opacity = "1";
});

window.addEventListener("mouseout", (event) => {
  if (event.relatedTarget) {
    return;
  }
  cursorGlow.style.opacity = "0";
});

document.querySelectorAll(".ripple").forEach((element) => {
  element.addEventListener("click", (event) => {
    const rect = element.getBoundingClientRect();
    const wave = document.createElement("span");
    const originX = event.clientX || rect.left + rect.width / 2;
    const originY = event.clientY || rect.top + rect.height / 2;
    wave.className = "ripple-wave";
    wave.style.left = `${originX - rect.left}px`;
    wave.style.top = `${originY - rect.top}px`;
    element.appendChild(wave);
    window.setTimeout(() => wave.remove(), 720);
  });
});

async function toggleAppFullscreen() {
  try {
    if (document.fullscreenElement === appShell) {
      await document.exitFullscreen();
      return;
    }
    await appShell.requestFullscreen();
  } catch (error) {
    showToast("Fullscreen was blocked on this browser.");
  }
}

appFullscreenBtn.addEventListener("click", toggleAppFullscreen);

document.addEventListener("fullscreenchange", () => {
  const active = document.fullscreenElement === appShell;
  appFullscreenBtn.textContent = active ? "Exit Fullscreen" : "Enter Fullscreen";
});

function keepPlayFrameInView() {
  if (!playFullscreen) {
    return;
  }

  playFrameShell.style.top = "0px";
  playFrameShell.style.left = "0px";
  playFrameShell.style.width = `${window.innerWidth}px`;
  playFrameShell.style.height = `${window.innerHeight}px`;
}

function finishPlayExit() {
  playFrameShell.classList.remove("is-floating", "is-fullscreen");
  playFrameShell.style.top = "";
  playFrameShell.style.left = "";
  playFrameShell.style.width = "";
  playFrameShell.style.height = "";
  playFrameShell.style.zIndex = "";
  playFrameShell.style.margin = "";
  frameBackdrop.classList.remove("is-visible");
  playFullscreenBtn.textContent = "Fullscreen ⛶";
  if (playPlaceholder) {
    playPlaceholder.replaceWith(playFrameShell);
    playPlaceholder = null;
  }
  document.body.classList.remove("app-locked");
}

function exitPlayFullscreen() {
  if (!playFullscreen) {
    return;
  }

  playFullscreen = false;
  const targetRect = playPlaceholder.getBoundingClientRect();
  const frameRect = playFrameShell.getBoundingClientRect();

  playFrameShell.style.top = `${frameRect.top}px`;
  playFrameShell.style.left = `${frameRect.left}px`;
  playFrameShell.style.width = `${frameRect.width}px`;
  playFrameShell.style.height = `${frameRect.height}px`;

  cancelAnimationFrame(playAnimationFrame);
  playAnimationFrame = requestAnimationFrame(() => {
    frameBackdrop.classList.remove("is-visible");
    playFrameShell.classList.remove("is-fullscreen");
    playFrameShell.style.top = `${targetRect.top}px`;
    playFrameShell.style.left = `${targetRect.left}px`;
    playFrameShell.style.width = `${targetRect.width}px`;
    playFrameShell.style.height = `${targetRect.height}px`;
  });

  window.setTimeout(() => {
    finishPlayExit();
  }, 560);
}

function enterPlayFullscreen() {
  if (playFullscreen) {
    return;
  }

  playFullscreen = true;
  const rect = playFrameShell.getBoundingClientRect();
  playPlaceholder = document.createElement("div");
  playPlaceholder.className = "play-frame-placeholder";
  playPlaceholder.style.height = `${rect.height}px`;
  playFrameShell.after(playPlaceholder);

  playFrameShell.classList.add("is-floating");
  playFrameShell.style.top = `${rect.top}px`;
  playFrameShell.style.left = `${rect.left}px`;
  playFrameShell.style.width = `${rect.width}px`;
  playFrameShell.style.height = `${rect.height}px`;
  document.body.appendChild(playFrameShell);
  document.body.classList.add("app-locked");

  cancelAnimationFrame(playAnimationFrame);
  playAnimationFrame = requestAnimationFrame(() => {
    frameBackdrop.classList.add("is-visible");
    playFrameShell.classList.add("is-fullscreen");
    keepPlayFrameInView();
  });

  playFullscreenBtn.textContent = "Exit Fullscreen";
}

playFullscreenBtn.addEventListener("click", () => {
  if (playFullscreen) {
    exitPlayFullscreen();
    return;
  }
  enterPlayFullscreen();
});

frameBackdrop.addEventListener("click", exitPlayFullscreen);

window.addEventListener("resize", keepPlayFrameInView);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && playFullscreen) {
    exitPlayFullscreen();
  }
});
