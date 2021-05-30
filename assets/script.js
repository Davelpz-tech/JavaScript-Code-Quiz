/* global variables */
var startButtonEl = document.getElementById('start');
var nextButtonEl = document.getElementById('next');
var questionsEl = document.getElementById('question-container');
var highscoreButtonEl = document.getElementById('submit');
var showScoreContainer = document.getElementById('high-score');
var questionEl = document.getElementById('question-location');
var answerEl = document.getElementById('answer-btn-container');
var submitScoreButton = document.getElementById('submit-score');
var backButtonEl = document.getElementById('back-btn');
var correctAnswerShow = document.getElementById('correct-answer')
var wrongAnswerShow = document.getElementById('wrong-answer')
var score = 0;

/*--------------------------------------------------------------------*/

/*gloabl time variable */
var counter = 60;

/* Event Listeners */
startButtonEl.addEventListener('click', beginGame);
highscoreButtonEl.addEventListener('click', showHighscore);
backButtonEl.addEventListener('click', returnMainMenu)
submitScoreButton.addEventListener('click', submitHighScore)
nextButtonEl.addEventListener('click', () => {
    if(currentQuestion < questionSet.length -1) {
        currentQuestion++
        nextQuestionSet()
    } else {
        gameOver()
        score = counter;
        console.log(score);
    }
})
/*--------------------------------------------------------------------*/


/* Navigate Page */
function showHighscore(){
    showScoreContainer.classList.remove('hide');
    startButtonEl.classList.add('hide');
    highscoreButtonEl.classList.add('hide');
}

function returnMainMenu(){
    showScoreContainer.classList.add('hide');
    startButtonEl.classList.remove('hide');
    highscoreButtonEl.classList.remove('hide');
}
/*--------------------------------------------------------------------*/

/* Game Logic */
function beginGame(){
    startButtonEl.classList.add('hide');
    questionsEl.classList.remove('hide');
    nextButtonEl.classList.remove('hide');
    highscoreButtonEl.classList.add('hide');
    currentQuestion = [0];
    randomQuestion = questionSet.sort(() => Math.random() - .5);
    nextQuestionSet();
    
        /* Timer Logic */
    counter = 60;
    setInterval(function(){
        counter--;

        if(counter >= 0){
            secondsEl = document.getElementById('seconds-remaining');
            secondsEl.innerText = counter
        } else {
            gameOver();
        }
    }, 1000)
}

let randomQuestion, currentQuestion

var questionSet = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: '<script>', correct: true},
            {text: '<scripting>', correct: false},
            {text: '<JavaScript', correct: false},
            {text: '<link>', correct: false},
        ]
        
    }, {
        question: "What is the Naming Convention called, in which the first letter of each word in a compound word is capitalized, except for the first word?",
        answers: [
            {text: 'Camel Space', correct: false},
            {text: 'snake_case', correct: false},
            {text: 'camelCase', correct: true},
            {text: 'PascalCase', correct: false},
        ]
    }, {
        question: "How do you write 'hello' in an alert box?",
        answers: [
            {text: "msg('hello');", correct: false},
            {text: "msgBox('hello');", correct: false},
            {text: "alertBox('hello');", correct: false},
            {text: "alert('hello');", correct: true},
        ]
    }, {
        question: "What year does JavaScript's time function originate from?",
        answers: [
            {text: 'midnight on January 1, 1970, UTC', correct: true},
            {text: 'July 4, 1998', correct: false},
            {text: 'April 1, 2000', correct: false},
            {text: 'Highnoon on May 5, 1970, UTC', correct: false},
        ]
    }, {
        question: "Is JavaScript fun?",
        answers: [
            {text: 'no', correct: false},
            {text: 'Yes... when it works', correct: true},
            {text: 'also no', correct: false},
            {text: 'NO (but in capital letters)', correct: false},
        ]
    }
]

function showQuestion(question){
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerEl.appendChild(button)
    })
}

function resetQuestions(){
    nextButtonEl.classList.add('hide');
    correctAnswerShow.classList.add('hide');
    while(answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
}

function chooseAnswer(e){
    var selectedAnswer = e.target
    var correct = selectedAnswer.dataset.correct
    var correctAnswerShow = document.getElementById('correct-answer')
    var wrongAnswerShow = document.getElementById('wrong-answer')
    console.log(correct)
    if(correct == 'true'){
        correctAnswerShow.classList.remove('hide');
        wrongAnswerShow.classList.add('hide');
        nextButtonEl.classList.remove('hide');
    } else if (correct = "undefined") {
        wrongAnswerShow.classList.remove('hide');
        correctAnswerShow.classList.add('hide');
        counter = counter - 2;
    }
    setStatusClass(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function nextQuestionSet(){
    resetQuestions()
    showQuestion(randomQuestion[currentQuestion])
} 


/*--------------------------------------------------------------------*/

/* Score Logic */
function submitHighScore(){
    var username = document.getElementById('name-input').value
    localStorage.setItem(username, score);
    event.preventDefault()


    var newLiLocation = document.getElementById('scores');
    var newLi = document.createElement('li');
    newLi.innerText = username + " " + score;
    newLiLocation.appendChild(newLi);
}
/*--------------------------------------------------------------------*/

function gameOver(){
    showScoreContainer.classList.remove('hide');
    startButtonEl.classList.add('hide');
    highscoreButtonEl.classList.add('hide');
    questionsEl.classList.add('hide');
    nextButtonEl.classList.add('hide');
}