const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/thirsty.png",
    text: "I'm Thirsty",
  },
  {
    image: "./img/hungry.png",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.png",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.png",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.png",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.png",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.png",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.png",
    text: "I'm Scared",
  },
  {
    image: "./img/play.png",
    text: "I Want To Play",
  },
  {
    image: "./img/home.png",
    text: "I Want To Go Home",
  },
  {
    image: "./img/study.png",
    text: "I Want To Study",
  },
  {
    image: "./img/sleep.png",
    text: "I Want To Sleep",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  //Speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    //Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 1000);
  });

  main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();

//Store voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

//Speak Text
function speakText() {
  speechSynthesis.speak(message);
}

// Set Voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

//Voices Changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

//toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

//Close Button

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

//change Voice
voicesSelect.addEventListener("change", setVoice);

//Read text
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
