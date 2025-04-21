const profiles = [
  { name: "Lea", age: 24, bio: "Mag Hunde & lange Spaziergänge", img: "assets/images/lea.jpg", liked: false },
  { name: "Nina", age: 22, bio: "Fitness & Smoothie Lover", img: "assets/images/nina.jpg", liked: false },
  { name: "Luna", age: 25, bio: "Ich reise gern um die Welt", img: "assets/images/luna.jpg", liked: false }
];

let currentIndex = 0;

const cardContainer = document.getElementById("card-container");
const matchPopup = document.getElementById("match-popup");
const matchSound = document.getElementById("match-sound");

function renderCard() {
  cardContainer.innerHTML = "";
  if (currentIndex >= profiles.length) return;

  const profile = profiles[currentIndex];
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${profile.img}" alt="${profile.name}">
    <div class="info">
      <h2>${profile.name}, ${profile.age}</h2>
      <p>${profile.bio}</p>
    </div>
  `;
  cardContainer.appendChild(card);
}

function like() {
  profiles[currentIndex].liked = true;
  simulateMatch();
  currentIndex++;
  renderCard();
}

function dislike() {
  currentIndex++;
  renderCard();
}

function simulateMatch() {
  if (currentIndex % 2 === 1) {
    matchPopup.classList.remove("hidden");
    matchSound.play();
  }
}

function closeMatch() {
  matchPopup.classList.add("hidden");
}

renderCard();
