var countDownInterval,
    countDownQuiz,
    timeExpired,
    resultField,
    resultDesc,
    multiplicand,
    multiplier,
    correctResult,
    wrongResult1,
    wrongResult2,
    answersArr;

function quizLife() {
    //add event to selected item from array of bonusItems
    var $quiz = $('.bonus-life');
    $quiz.on('click', function () {

        gameInProgress.append('<div class="quiz-board higher-z-index fade-in-quiz"><div class="count-down" id="count-down"></div><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span> is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer-1">1</div></div><div class="option"><div class="answer-box" id="answer-2">1</div></div><div class="option"><div class="answer-box" id="answer-3">1</div></div></div></div><div class="result-field hidden" id="result-field"><span class="result-desc" id="result-desc"></span><a href="#" class="quiz-button">ok</a></div></div></div>');
        countDownTime();
        clear();
        quizForBonusLife();
        timeExpired = setTimeout(timeOutForQuiz, 10000);
    });
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//create quiz to win bonus life
function quizForBonusLife() {
    if (currentTimer <= 480) {
        multiplicand = randomNum(10, 20);
        multiplier = randomNum(10, 20);
        correctResult = multiplicand * multiplier;
        wrongResult1 = correctResult + randomNum(1, 12);
    }
    else if (currentTimer <= 300) {
        multiplicand = randomNum(15, 30);
        multiplier = randomNum(15, 30);
        correctResult = multiplicand * multiplier;
        wrongResult1 = correctResult + randomNum(1, 12);
    }
    else {
        multiplicand = randomNum(5, 15);
        multiplier = randomNum(5, 15);
        correctResult = multiplicand * multiplier;
        wrongResult1 = correctResult + randomNum(1, 12);
    }
    wrongRes2();
    answersArr = [wrongResult1, wrongResult2, correctResult];

    answersArr.sort(function () {
        return 0.5 - Math.random();
    });

    var guessObj = {
        multiplicand: multiplicand,
        multiplier: multiplier,
        answersArr: answersArr,
        goodAnswer: correctResult
    };

    $('#multiplicand').html(guessObj.multiplicand);
    $('#multiplier').html(guessObj.multiplier);
    $('#answer-3').html(guessObj.answersArr[2]);
    $('#answer-2').html(guessObj.answersArr[1]);
    $('#answer-1').html(guessObj.answersArr[0]);

    resultField = $('.result-field');
    resultDesc = $('.result-desc');

    $('.answer-box').on('click', function (e) {
        //if selected element is a good answer add bonus and points to score
        if (parseInt(e.target.innerHTML) === guessObj.goodAnswer) {
            resultField.removeClass('hidden').addClass("correct fade-down-quiz");
            resultDesc.html("Good Job! You win a bonus life!");
            document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 100}}));
            $($('.result-container-element')[2]).append('<span class="glyphicon glyphicon-heart"></span>');
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = '';
            clearTimeout(timeExpired);
        }
        else {
            resultField.removeClass('hidden').addClass("wrong fade-down-quiz");
            resultDesc.html("You lost :( Try next time...");
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = '';
            clearTimeout(timeExpired);
        }
        quitQuiz();
    });
}
//quit from quiz (restart all intervals)
function quitQuiz() {
    $('.quiz-button').on('click', function () {
        $('.quiz-board')
            .addClass("fade-out-quiz")
            .removeClass('fade-in-quiz')
            .delay(2000)
            .queue(function () {
                $(this).remove();
            });
        //restart intervals
        restartIntervals();
    });
}
//display timeout info
function timeOutForQuiz() {
    resultField.removeClass('hidden').addClass("wrong fade-down-quiz");
    resultDesc.html("Too long... You lost :( Try next time...");
    quitQuiz();
}
//count down time to answer
function countDownTime() {
    var seconds = 9,
        second = 0;
    countDownQuiz = document.getElementById('count-down');

    countDownInterval = setInterval(function () {
        countDownQuiz.innerHTML = 'You have ' + (seconds - second) + ' seconds left';
        if (second >= seconds) {
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = "Time's up";
        }
        second++;
    }, 1000);
}
function wrongRes2() {
    if (correctResult > 30) {
        wrongResult2 = correctResult - randomNum(1, 12);
    }
    else {
        wrongResult2 = correctResult + randomNum(12, 20);
    }
}