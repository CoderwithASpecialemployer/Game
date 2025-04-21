// Dark Mode Toggle mit Speicherung
const modeBtn = document.getElementById("modeBtn");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  enableDark();
} else {
  disableDark();
}
modeBtn.addEventListener("click", () => {
  document.body.classList.contains("dark") ? disableDark() : enableDark();
});
function enableDark() {
  document.body.classList.add("dark");
  modeBtn.textContent = "☀️";
  localStorage.setItem("theme", "dark");
}
function disableDark() {
  document.body.classList.remove("dark");
  modeBtn.textContent = "🌙";
  localStorage.setItem("theme", "light");
}

// Scroll‑Reveal Animation
const revealEls = document.querySelectorAll(".reveal");
function handleReveal() {
  const winH = window.innerHeight;
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < winH - 100) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

// Back‑to‑Top Button
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 300 ? "flex" : "none";
});
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Stats Counter
window.addEventListener("load", () => {
  document.querySelectorAll(".num").forEach(counter => {
    const target = +counter.dataset.target;
    const step = target / 50;
    const update = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + step);
        setTimeout(update, 40);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
});
