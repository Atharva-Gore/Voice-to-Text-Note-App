const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const saveBtn = document.getElementById("saveBtn");
const noteArea = document.getElementById("note");
const notesList = document.getElementById("notesList");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition. Please use Chrome.");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
  noteArea.value = transcript;
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
};

startBtn.onclick = () => {
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

saveBtn.onclick = () => {
  const note = noteArea.value.trim();
  if (note) {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
    noteArea.value = "";
  } else {
    alert("Note is empty!");
  }
};
