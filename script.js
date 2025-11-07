const tg = window.Telegram.WebApp;
tg.expand();

let score = 0;
let currentQuestion = 0;

const questions = [
  { q: "Question 1: Choose correct answer", a: ["A","B","C","D"], correct: 1 },
  { q: "Question 2: Choose correct answer", a: ["A","B","C","D"], correct: 2 },
  { q: "Question 3: Choose correct answer", a: ["A","B","C","D"], correct: 0 },
];

function startListening() {
  startQuiz("Listening");
}
function startReading() {
  startQuiz("Reading");
}
function startWriting() {
  startQuiz("Writing");
}
function startSpeaking() {
  startQuiz("Speaking");
}

function startQuiz(section) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion();
  startTimer(5*60); // 5 минут
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.q;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  q.a.forEach((ans,i)=>{
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = ()=>selectAnswer(i);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(i) {
  if(i === questions[currentQuestion].correct) score++;
}

function nextQuestion() {
  currentQuestion++;
  if(currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

let timerInterval;
function startTimer(seconds) {
  const timerDiv = document.getElementById("timer");
  let sec = seconds;
  timerInterval = setInterval(()=>{
    let m = Math.floor(sec/60);
    let s = sec%60;
    timerDiv.innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    sec--;
    if(sec<0){
      clearInterval(timerInterval);
      endQuiz();
    }
  },1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz").innerHTML = `<h2>Твой результат: ${score}/${questions.length}</h2>`;
  // Отправляем результат в Telegram
  tg.sendData(JSON.stringify({score: score}));
}
