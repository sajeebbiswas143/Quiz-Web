let currentQuestionIndex = 0;
let totalScore = 0;
let setScore = 0;
const questionsPerSet = 5; // Number of questions in each set

// Shuffle questions
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

const h1 = document.querySelector(".quiz-container h1");
const questionCount = document.getElementById("question-count");
const optionsContainer = document.querySelector(".options");
let optionButtons = document.querySelectorAll(".option-btn");

const totalQuestions = shuffledQuestions.length;

function showQuestion(index) {
  const q = shuffledQuestions[index];
  h1.innerText = q.text;
  updateQuestionCount(index);

  optionButtons.forEach((btn, i) => {
    btn.innerText = `(${String.fromCharCode(65 + i)}) ${q.options[i]}`;
    btn.disabled = false;
    btn.style.backgroundColor = "";
    btn.style.color = "";

    btn.onclick = () => {
      const selected = btn.innerText.replace(/^\([A-D]\)\s*/, "");
      if (selected === q.answer) {
        btn.style.backgroundColor = "green";
        setScore++;
        totalScore++;
      } else {
        btn.style.backgroundColor = "red";
      }

      optionButtons.forEach(b => b.disabled = true);

      setTimeout(() => {
        currentQuestionIndex++;
        if (
          currentQuestionIndex % questionsPerSet === 0 ||
          currentQuestionIndex === totalQuestions
        ) {
          showSetResult();
        } else {
          showQuestion(currentQuestionIndex);
        }
      }, 700);
    };
  });
}

function showSetResult() {
  const setNumber = Math.ceil(currentQuestionIndex / questionsPerSet);
  h1.innerText = `Set ${setNumber} Complete!`;
  const setTotal = Math.min(questionsPerSet, totalQuestions - (setNumber - 1) * questionsPerSet);

  optionsContainer.innerHTML = `
    <p>You scored <strong>${setScore}</strong> out of ${setTotal} in this set.</p>
    ${
      currentQuestionIndex < totalQuestions
        ? `<button onclick="nextSet()">Next Set</button>`
        : `<button onclick="showFinalResult()">See Final Result</button>`
    }
  `;

  // Reset per-set score
  setScore = 0;
}

function nextSet() {
  optionsContainer.innerHTML = `
    ${Array.from({ length: 4 })
      .map(() => '<button class="option-btn"></button>')
      .join("")}
  `;
  optionButtons = document.querySelectorAll(".option-btn");
  showQuestion(currentQuestionIndex);
}

function showFinalResult() {
  h1.innerText = `🎉 Quiz Completed!`;
  optionsContainer.innerHTML = `
    <p>Your final score is <strong>${totalScore}</strong> out of ${totalQuestions}.</p>
    <button onclick="location.href='index.html'">Back to Home</button>
  `;
}

function updateQuestionCount(index) {
  questionCount.textContent = `Question ${index + 1}/${totalQuestions}`;
}

document.addEventListener("DOMContentLoaded", () => {
  showQuestion(currentQuestionIndex);
});
