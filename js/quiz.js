function Quiz(questionList) {
  this.totalQuestion = questionList.length;
  this.questionIndex = 0;
  this.answeredQuestionCounter = 0;
  this.questionList = questionList;
}

Quiz.prototype.getQuestion = function () {
  if (this.questionIndex + 1 <= this.totalQuestion) {
    return this.questionList[this.questionIndex];
  } else {
    return -1;
  }
};
