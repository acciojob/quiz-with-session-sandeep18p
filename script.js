// Function to render the quiz questions and options
let progress =[];
const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
      answer: "Everest",
    },
    {
      question: "What is the largest country by area?",
      choices: ["Russia", "China", "Canada", "United States"],
      answer: "Russia",
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];
  
function renderQuestions() {
    const questionsElement = document.getElementById('questions');
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};

    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        question.choices.forEach(choice => {
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${index}`);
            choiceElement.setAttribute("value", choice);

            // Check if there's progress stored and if this choice matches the stored progress
            if (progress[index] === choice) {
                choiceElement.setAttribute("checked", true);
            }

            choiceElement.addEventListener("change", function(event) {
                progress[index] = event.target.value;
                sessionStorage.setItem('progress', JSON.stringify(progress));
            });

            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        });

        questionsElement.appendChild(questionElement);
    });
}

// Function to calculate the score
function calculateScore() {
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    let score = 0;
    questions.forEach((question, index) => {
        if (progress[index] === question.answer) {
            score++;
        }
    });
    localStorage.setItem('score', score);
    return score;
}

// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderQuestions();

    // Event listener for the submit button
    document.getElementById('submit').addEventListener('click', function() {
        const score = calculateScore();
        document.getElementById('score').innerText = `Your score is ${score} out of 5.`;
    });
});
