function Ui(quiz) {
  this.pageStartQuiz = document.getElementById("start");
  this.btnStartQuiz = document.getElementById("btn-start-quiz");

  this.pageMain = document.getElementById("quiz");
  this.txtTimeRemaining = document.querySelector(".timing-seconds");
  this.barTimeRemaining = document.querySelector(".time-bar__complete");
  this.mainQuestionSection = document.querySelector(".container-main");
  this.pagination = document.querySelector(".pagination");
  this.btnNextQuestion = document.querySelector(".btn-next");

  this.pageScore = document.getElementById("end");
  this.btnRestart = document.querySelector(".btn-replay");
  this.btnQuit = document.querySelector(".btn-quit");

  this.trueIcon = document.createElement("i");
  this.trueIcon.className = "bi bi-check-circle";

  this.falseIcon = document.createElement("i");
  this.falseIcon.className = "bi bi-x-circle";

  this.quiz = quiz;
}

Ui.prototype.showQuestion = function () {
  let question = this.quiz.getQuestion();
  console.log(question);

  if (question != -1) {
    this.currentPage = this.quiz.questionIndex + 1;

    this.mainQuestionSection.innerHTML = `
        <h2 class="question">
          ${question.questionText}
        </h2>
        <div class="option-list">
          <div class="option btn btn-outline-yellow">a) ${question.questionOptions.a}</div>
          <div class="option btn btn-outline-yellow">b) ${question.questionOptions.b}</div>
          <div class="option btn btn-outline-yellow">c) ${question.questionOptions.c}</div>
          <div class="option btn btn-outline-yellow">d) ${question.questionOptions.d}</div>
        </div>
    `;

    let options = document.querySelector(".option-list").children;
    for (let i = 0; i < options.length; i++) {
      options[i].addEventListener("click", answerTheQuestion);
    }

    //timer
    startTimer(10);
  }

  this.questionNumberUpdate();
};

Ui.prototype.questionNumberUpdate = function () {
  this.pagination.innerHTML = `<span class="total-page">${
    this.quiz.totalQuestion
  }</span>/<span class="current-page">${this.quiz.questionIndex + 1}</span>`;
};

Ui.prototype.showTrueAnswer = function () {
  let trueAnswer = this.quiz.getQuestion().trueAnswer;
  let trueIndex =
    trueAnswer == "a" ? 0 : trueAnswer == "b" ? 1 : trueAnswer == "c" ? 2 : 3;
  document
    .querySelector(".option-list")
    .children[trueIndex].setAttribute("true-answered", true);
  document
    .querySelector(".option-list")
    .children[trueIndex].appendChild(this.trueIcon);
};

Ui.prototype.setDisableAllOptions = function () {
  let options = document.querySelector(".option-list").children;
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");
  }

  this.btnNextQuestion.classList.remove("disabled");
  this.btnNextQuestion.addEventListener("click", goToNextQuestion);
};

Ui.prototype.finishTheQuiz = function () {
  this.pageMain.style.display = "none";

  document.querySelector(
    ".end-text"
  ).textContent = `You answered ${this.quiz.answeredQuestionCounter} out of ${this.quiz.totalQuestion} questions correctly.`;
  this.pageScore.style.display = "block";
};

btnQuit.addEventListener("click", quitTheQuiz);
btnRestart.addEventListener("click", restartTheQuiz);
