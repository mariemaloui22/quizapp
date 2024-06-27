const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultsDiv = document.getElementById("results");

let shuffleQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "2", correct: false },
      { text: "44", correct: false },
      { text: "423", correct: false },
    ],
  },
  {
    question: "What is the abbreviation of HTML?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hypertext Machine Language", correct: false },
      { text: "Hypertext Machine Learning", correct: false },
      { text: "Hyper Media Language", correct: false },
    ],
  },
  {
    question: "Which tag is used to create a paragraph?",
    answers: [
      { text: "<par></par>", correct: false },
      { text: "<p></p>", correct: true },
      { text: "<ph></ph>", correct: false },
      { text: "<h></h>", correct: false },
    ],
  },
  {
    question: "How can you create an element in JavaScript?",
    answers: [
      { text: "By using getElementById", correct: true },
      { text: "By using getElementByClassName", correct: false },
      { text: "By using getElementByTagName", correct: false },
      { text: "By using getElementByTarget", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultsDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = question.answers.indexOf(answer); // Set value to the index of the answer
    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text; // Set label text to the answer's text

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(answerButtons.querySelectorAll("input")).findIndex((radio) => radio.checked);

  if (answerIndex !== -1) {
    if (shuffleQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffleQuestions.length) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none"; 
  nextButton.classList.add("hide");          
  restartButton.classList.remove("hide");    
  resultsDiv.classList.remove("hide");
  resultsDiv.innerText = `Your final score: ${score} / ${shuffleQuestions.length}`;  
}