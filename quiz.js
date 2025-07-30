let currentQuestionIndex = 0;
let score = 0;

// Shuffle the questions array
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

const h1 = document.querySelector(".quiz-container h1");
const optionButtons = document.querySelectorAll(".option-btn");

function showQuestion(index) {
  const q = shuffledQuestions[index];
  h1.innerText = q.text;

  optionButtons.forEach((btn, i) => {
    btn.innerText = `(${String.fromCharCode(65 + i)}) ${q.options[i]}`;
    btn.disabled = false;
    btn.style.backgroundColor = "";
    btn.style.color = "";

    btn.onclick = () => {
      const selected = btn.innerText.replace(/^\([A-D]\)\s*/, "");
      if (selected === q.answer) {
        btn.style.backgroundColor = "green";
        score++;
        alert("✅ Correct!");
      } else {
        btn.style.backgroundColor = "red";
        alert(`❌ Wrong! Correct is: ${q.answer}`);
      }

      optionButtons.forEach(b => b.disabled = true);

      // Move to next question after 1 second
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
          showQuestion(currentQuestionIndex);
        } else {
          showResult();
        }
      }, 1000);
    };
  });
}

function showResult() {
  h1.innerText = `Quiz Completed! You scored ${score} out of ${shuffledQuestions.length}`;
  document.querySelector(".options").innerHTML = `<button onclick="location.href='index.html'">Back to Home</button>`;
}

// Start the quiz
document.addEventListener("DOMContentLoaded", () => {
  showQuestion(currentQuestionIndex);
});
