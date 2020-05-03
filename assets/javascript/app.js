$(document).ready(function(){
//event listener

$('#remaining-time').hide();
$('#start').on('click', trivia.startGame);
// $(document).on('click', '.option', trivia.guessChecker);


})

var trivia = {
   
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 25,
    timerOn: false,
    timerId : '',

    questions: {
      q1: 'How many dogs do I have?',
      q2: 'When is my birthday?',
      q3: 'What city did I grow up?',
      q4: 'What is my favorite sport?',
      q5: "Where do I work?",
    },
    choices: {
      q1: ['1', '2', '3', '4'],
      q2: ['May 1', 'May 2', 'May 6', 'May 9'],
      q3: ['Holland, MI', 'Grand Rapids, MI', 'Orlando, FL', 'Detroit, MI'],
      q4: ['Soccer', 'Basketball', 'Volleyball', 'Cricket'],
      q5: ['Amazon','Chick Fil A','I do not have a job','landscaper'],
    },
    answers: {
      q1: '2',
      q2: 'May 9',
      q3: 'Holland, MI',
      q4: 'Volleyball',
      q5: 'Chick Fil A',
    },


//start game

startGame: function(){

   trivia.currentSet = 0;
   trivia.correct = 0
   trivia.incorrect = 0
   trivia.unanswered = 0
   clearInterval(trivia.timerId)

   $('#game').show();

   $('#results').html();

   $('#timer').text(trivia.timer);

   $('#start').hide();

   $('#remaining-time').show();

   trivia.nextQuestion();

},

nextQuestion : function(){
    trivia.timer = 20
    $('#timer').text(trivia.timer);

let questionContent = Object.values(trivia.questions) [trivia.currentSet];
$('#question').text(questionContent)



}




}