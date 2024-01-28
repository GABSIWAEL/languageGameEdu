const questions = [
    { foreign: 'Bonjour', english: 'Hello' },
    { foreign: 'Merci', english: 'Thank you' },
    { foreign: 'Oui', english: 'Yes' },
    { foreign: 'Non', english: 'No' },
    { foreign: 'Chat', english: 'Cat' },
    { foreign: 'Chien', english: 'Dog' },
    { foreign: 'Fleur', english: 'Flower' },
    { foreign: 'École', english: 'School' },
    { foreign: 'Livre', english: 'Book' },
    { foreign: 'Plage', english: 'Beach' },
    // Add more questions as needed
];

const questionsSecondGame = [
    { phrase: 'Bonjour ___', answer: 'les etudiants', image: 'image2.jpg' },
    { phrase: 'apprendre une nouvelle ___', answer: 'Langue', image: 'image1.jpg' },
    { phrase: 'la  ___ est bleu', answer: 'Voiture', image: 'image3.jpg' },
    // Add more questions for the second game
];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let userAnswers = [];

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');

    const correctAnswer = questions[currentQuestionIndex].english;
    const incorrectOptions = getIncorrectOptions(correctAnswer, questions.map(q => q.english));
    const options = shuffleOptions(correctAnswer, incorrectOptions);

    questionElement.innerHTML = '<p class="translate-text">Translate the following:</p>';
    questionElement.innerHTML += `<p class="foreign-word">${questions[currentQuestionIndex].foreign}</p>`;
    questionElement.innerHTML += `<p class="question-number">(${currentQuestionIndex + 1}/${questions.length})</p>`;

    optionsContainer.innerHTML = '<div class="options-container">';
    for (let i = 0; i < options.length; i++) {
        optionsContainer.innerHTML += `<button class="option-button" onclick="checkAnswer('${options[i]}')">${options[i]}</button>`;
    }
    optionsContainer.innerHTML += '</div>';
}

function shuffleOptions(correctAnswer, incorrectOptions) {
    const allOptions = [correctAnswer, ...incorrectOptions];
    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    return allOptions;
}

function getIncorrectOptions(correctAnswer, allOptions) {
    const incorrectOptions = [];
    while (incorrectOptions.length < 2) {
        const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        if (randomOption !== correctAnswer && !incorrectOptions.includes(randomOption)) {
            incorrectOptions.push(randomOption);
        }
    }
    return incorrectOptions;
}

function checkAnswer(selectedOption) {
    const resultElement = document.getElementById('result');

    if (selectedOption === questions[currentQuestionIndex].english) {
        resultElement.textContent = 'Correct! Well done.';
        incrementCorrectCount();
    } else {
        resultElement.textContent = 'Incorrect. Try again.';
        incrementIncorrectCount();
    }

    userAnswers.push(selectedOption);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        resultElement.textContent += ' Game Over!';
        displayResults();
        initializeSecondGame();
    }
}

function incrementCorrectCount() {
    correctCount++;
}

function incrementIncorrectCount() {
    incorrectCount++;
}

function displayResults() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `<p>Game Over! Results:</p>
                                  <p>Correct Answers: ${correctCount}</p>
                                  <p>Incorrect Answers: ${incorrectCount}</p>`;

    resultsContainer.innerHTML += '<p>Correct Answers:</p>';
    resultsContainer.innerHTML += '<ul>';
    for (const question of questions) {
        resultsContainer.innerHTML += `<li><span>${question.foreign}</span> - <span>${question.english}</span></li>`;
    }
    resultsContainer.innerHTML += '</ul>';

    resultsContainer.innerHTML += '<p>Incorrect Answers:</p>';
    resultsContainer.innerHTML += '<ul>';
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].english !== userAnswers[i]) {
            resultsContainer.innerHTML += `<li class="incorrect"><span>${questions[i].foreign}</span> - Your Answer: <span>${userAnswers[i]}</span>, Correct Answer: <span>${questions[i].english}</span></li>`;
        }
    }
    resultsContainer.innerHTML += '</ul>';
    resultsContainer.innerHTML += '<button onclick="transitionToSecondGame()">Next Game</button>';

    // Initialize second game (moved from initializeSecondGame function)
    initializeSecondGame();
}

function displayQuestionSecondGame() {
    const questionElement = document.getElementById('question-2');
    const optionsContainer = document.getElementById('options-container-2');
    const questionImageElement = document.createElement('img');  // Create an <img> element

    // Get current question
    const currentQuestion = questionsSecondGame[currentQuestionIndex];

    // Set the source and alt attribute of the image
    questionImageElement.src = currentQuestion.image;
    questionImageElement.alt = `Image for: ${currentQuestion.phrase}`;

    // Append the image to the question element
    questionElement.innerHTML = '';  // Clear the content first
    questionElement.appendChild(questionImageElement);

    // Display phrase and input for answer
    questionElement.innerHTML += `<p class="translate-text">${currentQuestion.phrase}</p>`;
    questionElement.innerHTML += `<input type="text" id="answer-input" placeholder="Enter your answer">`;

    // Display current question number
    questionElement.innerHTML += `<p class="question-number">(${currentQuestionIndex + 1}/${questionsSecondGame.length})</p>`;

    // Display options
    optionsContainer.innerHTML = '<div class="options-container">';
    optionsContainer.innerHTML += `<button class="option-button" onclick="checkAnswerSecondGame()">Submit Answer</button>`;
    optionsContainer.innerHTML += '</div>';
}

function transitionToSecondGame() {
    document.getElementById('first-game').style.display = 'none';
    document.getElementById('second-game').style.display = 'block';

    // Reset variables for the second game
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    userAnswers = [];

    // Display the first question for the second game
    displayQuestionSecondGame();
}
function initializeSecondGame() {
    const nextGameButton = document.getElementById('next-game-button');
    nextGameButton.addEventListener('click', transitionToSecondGame);
}


function displayQuestionSecondGame() {
    const questionElement = document.getElementById('question-2');
    const optionsContainer = document.getElementById('options-container-2');

    const correctAnswer = questionsSecondGame[currentQuestionIndex].answer;
    const incorrectOptions = getIncorrectOptions(correctAnswer, questionsSecondGame.map(q => q.answer));
    const options = shuffleOptions(correctAnswer, incorrectOptions);

    questionElement.innerHTML = '<p class="translate-text">Complete the phrase:</p>';
    questionElement.innerHTML += `<p class="foreign-word">${questionsSecondGame[currentQuestionIndex].phrase}</p>`;
    questionElement.innerHTML += `<p class="question-number">(${currentQuestionIndex + 1}/${questionsSecondGame.length})</p>`;

    optionsContainer.innerHTML = '<div class="options-container">';
    for (let i = 0; i < options.length; i++) {
        optionsContainer.innerHTML += `<button class="option-button" onclick="checkAnswerSecondGame('${options[i]}')">${options[i]}</button>`;
    }
    optionsContainer.innerHTML += '</div>';
}

function checkAnswerSecondGame(selectedOption) {
    const resultElement = document.getElementById('result-2');

    if (selectedOption === questionsSecondGame[currentQuestionIndex].answer) {
        resultElement.textContent = 'Correct! Well done.';
        incrementCorrectCount();
    } else {
        resultElement.textContent = 'Incorrect. Try again.';
        incrementIncorrectCount();
    }

    userAnswers.push(selectedOption);

    currentQuestionIndex++;
    if (currentQuestionIndex < questionsSecondGame.length) {
        displayQuestionSecondGame();
    } else {
        resultElement.textContent += ' Game Over!';
        displayResultsSecondGame();
    }
}

function displayResultsSecondGame() {
    const resultsContainer = document.getElementById('results-container-2');
    resultsContainer.innerHTML = `<p>Game Over! Results:</p>
                                  <p>Correct Answers: ${correctCount}</p>
                                  <p>Incorrect Answers: ${incorrectCount}</p>`;

    resultsContainer.innerHTML += '<p>Correct Answers:</p>';
    resultsContainer.innerHTML += '<ul>';
    for (const question of questionsSecondGame) {
        resultsContainer.innerHTML += `<li><span>${question.phrase}</span> - <span>${question.answer}</span></li>`;
    }
    resultsContainer.innerHTML += '</ul>';

    resultsContainer.innerHTML += '<p>Incorrect Answers:</p>';
    resultsContainer.innerHTML += '<ul>';
    for (let i = 0; i < questionsSecondGame.length; i++) {
        if (questionsSecondGame[i].answer !== userAnswers[i]) {
            resultsContainer.innerHTML += `<li class="incorrect"><span>${questionsSecondGame[i].phrase}</span> - Your Answer: <span>${userAnswers[i]}</span>, Correct Answer: <span>${questionsSecondGame[i].answer}</span></li>`;
        }
    }
    resultsContainer.innerHTML += '</ul>';
}

// Initial display for the first game
displayQuestion();

// Check if the user can proceed to the second game
initializeSecondGame();
