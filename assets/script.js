var startButtonEl = document.getElementById('start');
var nextButtonEl = document.getElementById('next');
var questionsEl = document.getElementById('question-container');

startButtonEl.addEventListener('click', beginGame);

function beginGame(){
    console.log('hello');
    startButtonEl.classList.add('hide');
    questionsEl.classList.remove('hide');
    nextButtonEl.classList.remove('hide');
}

function nextQuestionSet(){

}

function chooseAnswer(){

}

function timer(){

}

function setHighScore(){

}
