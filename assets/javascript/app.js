$(document).ready(function () {
    //event listeners

    $('#remaining-time').hide();
    $('#start').on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);


})

var trivia = {
//question/answer storage
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 25,
    timerOn: false,
    timerId: '',

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
        q5: ['Amazon', 'Chick Fil A', 'I do not have a job', 'landscaper'],
    },
    answers: {
        q1: '2',
        q2: 'May 9',
        q3: 'Holland, MI',
        q4: 'Volleyball',
        q5: 'Chick Fil A',
    },


//start the game
    startGame: function () {

        trivia.currentSet = 0;
        trivia.correct = 0
        trivia.incorrect = 0
        trivia.unanswered = 0
        clearInterval(trivia.timerId)

        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();

    },
    nextQuestion: function () {


        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent)

        var questionChoices = Object.values(trivia.choices)[trivia.currentSet];
        $.each(questionChoices, function (index, key){
            $('#choices').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })


    },
//determines what happens to the timer
    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Time is up! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html('<h3>Thanks for Playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Play again?</p>');

            $('#game').hide();

            $('#start').show();
        }

    },

    //check the answer the user pressed and increments corret(green) or incorrct(red)
    guessChecker: function () {

        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },
    
    guessResult: function () {
//supposed to remove the choices from the last question but i cant get it to work.
     
        trivia.currentSet++;

        $('.choices').remove();
        $('#results h3').remove();

        trivia.nextQuestion();



    },



}