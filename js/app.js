const questionList = [
  new Question(
    "1-Hangisi Javascript paket yönetim uygulamasıdır?",
    { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" },
    "d"
  ),
  new Question(
    "2-Hangisi frontend kapsamında değerlendirilmez?",
    { a: "css", b: "html", c: "javascipt", d: "sql" },
    "d"
  ),
  new Question(
    "3-Hangisi backend kapsamında değerlendirilir?",
    { a: "node.js", b: "typescript", c: "angular", d: "react" },
    "a"
  ),
  new Question(
    "4-Hangisi javascript programlama dilini kullanmaz?",
    { a: "react", b: "angular", c: "vuejs", d: "asp.net" },
    "d"
  ),
];

const quiz = new Quiz(questionList);
const ui = new Ui(quiz);

function startQuiz() {
  ui.pageStartQuiz.style.display = "none";
  ui.pageMain.style.display = "block";
  ui.pageScore.style = display = "none";
  ui.showQuestion();
}

ui.btnStartQuiz.addEventListener("click", startQuiz);

function answerTheQuestion(e) {
  if (e.target.textContent[0] == quiz.getQuestion().trueAnswer) {
    e.target.setAttribute("true-answered", true);
    e.target.appendChild(ui.trueIcon);
    quiz.answeredQuestionCounter++;
  } else {
    e.target.setAttribute("false-answered", true);
    e.target.appendChild(ui.falseIcon);
    ui.showTrueAnswer();
  }

  ui.setDisableAllOptions();
  clearInterval(counter);
  counterLine = 10;
}

function goToNextQuestion(e) {
  if (quiz.questionIndex + 1 < quiz.totalQuestion) {
    quiz.questionIndex++;
    ui.showQuestion();
  } else {
    ui.finishTheQuiz();
  }
}

ui.btnQuit.addEventListener("click", function () {
  window.location.reload();
});

ui.btnRestart.addEventListener("click", () => {
  quiz.questionIndex = 0;
  quiz.answeredQuestionCounter = 0;
  // start button
  ui.btnStartQuiz.click();
  ui.pageScore.style.display = "none";
});

let counter; //for selected any option.
let counterLine = 10;
function startTimer(time) {
  ui.barTimeRemaining.style.width = `0%`;
  ui.txtTimeRemaining.textContent = time;

  counter = setInterval(timer, 1000);

  function timer() {
    time--;
    ui.txtTimeRemaining.textContent = time;

    //Time Remaining Bar width
    ui.barTimeRemaining.style.width = `${counterLine}%`;
    counterLine += 10;

    if (time == 0) {
      ui.txtTimeRemaining.textContent = "END";
      ui.setDisableAllOptions();
      ui.showTrueAnswer();
      clearInterval(counter);
      counterLine = 10;
    }
  }
}
