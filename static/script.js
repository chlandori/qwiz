let currentQuestions = [];
let score = 0;
let total = 0;

function startQuiz() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("quiz-area").style.display = "block";
  loadBatch();
}

async function loadBatch() {
  const res = await fetch("/next_batch");
  currentQuestions = await res.json();
  const container = document.getElementById("quiz");
  container.innerHTML = "";
  currentQuestions.forEach((q, i) => {
    container.innerHTML += `<p>${i+1}. ${q.question}</p>
      ${q.options.map((opt, idx) =>
        `<label><input type="radio" name="q${i}" value="${idx}">${opt}</label><br>`
      ).join("")}`;
  });
}

function submitAnswers() {
  currentQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      total++;
      if (parseInt(selected.value) === q.answer) {
        score++;
      }
    }
  });
  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = total;
}
