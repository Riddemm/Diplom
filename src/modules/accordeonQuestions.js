const accordeonQuestions = () => {

  const questionSection = document.querySelector('.questions');
  const questions = questionSection.querySelectorAll('.panel-heading');
  const answers = questionSection.querySelectorAll('.panel-collapse');

  questions.forEach((question, questionIndex) => {
    answers.forEach((answer, answerIndex) => {
      question.addEventListener('click', (event) => {
        event.preventDefault();
        if (questionIndex === answerIndex) {
          answer.style.display = 'block';
        } else {
          answer.style.display = 'none';
        }
      });
    })
  });

};

export default accordeonQuestions;