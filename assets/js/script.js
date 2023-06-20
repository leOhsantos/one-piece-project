const startBtn = document.getElementById("startBtn");
const instructionBtn = document.getElementById("instructionBtn");
const exitInstructionBtn = document.getElementById("exitInstructionBtn");
const progressBtn = document.getElementById("progressBtn");
const exitProgressBtn = document.getElementById("exitProgressBtn");
const exitBtn = document.getElementById("exitBtn");
const gameOverBtn = document.getElementById("gameOverBtn");
const gameOverText = document.querySelector(".game-over-text");
const gameOverBackground = document.querySelector(".game-over");
const quizMenu = document.querySelector(".quiz-menu");
const quiz = document.querySelector(".quiz");
const jollyRogerLuffy = document.getElementById("jollyRogerLuffy");
const jollyRogerTeach = document.getElementById("jollyRogerTeach");
const answers = document.querySelectorAll(".answer");
const footerText = document.querySelector(".quiz-footer-text");
const quizInstruction = document.querySelector(".quiz-instruction");
const quizProgress = document.querySelector(".quiz-progress");
const percentProgress = document.getElementById("percentProgress");
const titleProgress = document.getElementById("titleProgress");
const rankProgress = document.getElementById("rankProgress");
const quizScore = document.querySelector(".quiz-score");
const quizScoreResult = document.querySelector(".quiz-score-result");
const youWinText = document.querySelector(".you-win-text");
const quizScoreText = document.querySelectorAll(".quiz-score-text");
const scoreTitle = document.getElementById("scoreTitle");
const score = document.getElementById("score");
const rank = document.querySelector(".rank");
const theEndText = document.querySelector(".the-end-text");
const exitScoreBtn = document.getElementById("exitScoreBtn");
const questionNumberIcon = document.querySelector(".question-number-icon");
const questionSvg = document.querySelector(".question-svg");
const questionSvgPath = document.getElementById("svgPath");

const star1 = document.querySelector(".star-1");
const star3 = document.querySelector(".star-3");

const star2 = document.querySelector(".star-2");
let timeoutHandle = null;
let clicks = 0;

const miniLuffy = document.querySelector(".mini-luffy-container");
const miniLuffyAudio = document.getElementById("miniLuffyAudio");
const onePieceOp = document.getElementById("onePieceOp");

const timeProgress = document.getElementById("timeProgress");
let sec = 0;
let min = 0;
let h = 0;

let bonusProgress = null;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.querySelector(".question-text");
const textAll = document.getElementById("textAll");
const text20 = document.getElementById("text20");
const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");

window.addEventListener("beforeunload", () => {
    localStorage.setItem("timer", JSON.stringify({
        "second": sec,
        "minute": min,
        "hour": h
    }));
});

document.addEventListener("contextmenu", event => event.preventDefault());

document.addEventListener("DOMContentLoaded", () => {
    const progress = parseInt(localStorage.getItem("progress"));
    const isBonusActivated = localStorage.getItem("bonus");
    const timer = JSON.parse(localStorage.getItem("timer"));

    if (progress >= 50 && progress < 90) {
        if (star1) star1.style.display = "block";
    } else if (progress === 90) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
    } else if (progress === 100) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        if (star3) star3.style.display = "block";
    } else if (!progress) {
        if (star1) star1.style.display = "none";
        if (star2) star2.style.display = "none";
        if (star3) star3.style.display = "none";
    }

    if (star1) isBonusActivated ? star1.style.pointerEvents = "all" : star1.style.pointerEvents = "none";

    if (!timer) {
        startTimer();
    } else {
        if (timer.second) sec = timer.second;
        if (timer.minute) min = timer.minute;
        if (timer.hour) h = timer.hour;
        startTimer();
    }
});

function updateProgress(qNumber) {
    const currentProgress = questions[qNumber].questionNumber;
    const progress = localStorage.getItem("progress");

    if (currentProgress > 50) {
        bonusProgress += 1.6;
        if (bonusProgress > progress) localStorage.setItem("progress", Math.round(bonusProgress));
    } else if (currentProgress > progress) {
        localStorage.setItem("progress", currentProgress - 1);
    }
}

function resetInstructionBtn() {
    instructionBtn.setAttribute("data-bonus", "false");
    instructionBtn.style.cssText = "background-color: #9A6601; border-color: #983400;";
    instructionBtn.textContent = "Instruções";

    instructionBtn.addEventListener("mouseover", () => {
        instructionBtn.textContent = "Instruções";
        instructionBtn.style.cssText = "background-color: #ccc733; border-color: #983400; color: #000000;";
    });

    instructionBtn.addEventListener("mouseout", () => {
        instructionBtn.textContent = "Instruções";
    });
}

function addBonusAttributes() {
    quiz.classList.add("bonus");
    jollyRogerLuffy.classList.remove("block");
    jollyRogerTeach.classList.add("block");
    questionSvg.classList.add("bonus");
    questionNumber.classList.add("bonus");
    questionText.classList.add("bonus");
    answers.forEach((answer) => answer.classList.add("bonus"));
    footerText.classList.add("bonus");
    miniLuffy.style.display = "none";
}

function removeBonusAttributes() {
    const bonus = instructionBtn.getAttribute("data-bonus");

    if (quiz.classList.contains("bonus") || bonus == "true") {
        quiz.classList.remove("bonus");
        jollyRogerTeach.classList.remove("block");
        jollyRogerLuffy.classList.add("block");
        questionSvg.classList.remove("bonus");
        questionNumber.classList.remove("bonus");
        questionText.classList.remove("bonus");
        answers.forEach((answer) => answer.classList.remove("bonus"));
        footerText.classList.remove("bonus");
        miniLuffy.style.display = "block";

        gameOverText.classList.remove("bonus");
        gameOverBtn.classList.remove("bonus");
        gameOverBackground.classList.remove("bonus");
        resetInstructionBtn();
    }
}

function startQuiz() {
    removeBonusAttributes();

    clicks = 0;
    star2.style.setProperty("--vis", "hidden");
    star2.style.setProperty("--op", 0);

    quizMenu.style.display = "none";
    jollyRogerLuffy.classList.add("block");
    quiz.style.display = "block";

    q1.questionNumber.toString().length == 1 ? questionNumber.textContent = "0" + q1.questionNumber + "." : questionNumber.textContent = q1.questionNumber + ".";
    questionText.textContent = q1.question;
    A.textContent = q1.alt1;
    B.textContent = q1.alt2;
    C.textContent = q1.alt3;
    D.textContent = q1.alt4;
    A.setAttribute("value", q1.questionNumber - 1);
    B.setAttribute("value", q1.questionNumber - 1);
    C.setAttribute("value", q1.questionNumber - 1);
    D.setAttribute("value", q1.questionNumber - 1);
    questionNumber.setAttribute("value", q1.questionNumber);
    textAll.setAttribute("value", q1.questionNumber);
    text20.setAttribute("value", q1.questionNumber);

    const fail = localStorage.getItem("fail");
    if (!fail) localStorage.setItem("fail", 0);
}

function startQuizBonus() {
    bonusProgress = 50;

    addBonusAttributes();

    quizMenu.style.display = "none";
    quiz.style.display = "block";

    q51.questionNumber.toString().length == 1 ? questionNumber.textContent = "0" + q51.questionNumber + "." : questionNumber.textContent = q51.questionNumber + ".";
    questionText.textContent = q51.question;
    A.textContent = q51.alt1;
    B.textContent = q51.alt2;
    C.textContent = q51.alt3;
    D.textContent = q51.alt4;
    A.setAttribute("value", q51.questionNumber - 1);
    B.setAttribute("value", q51.questionNumber - 1);
    C.setAttribute("value", q51.questionNumber - 1);
    D.setAttribute("value", q51.questionNumber - 1);
    questionNumber.setAttribute("value", q51.questionNumber - 1);
}

function nextQuestion(qNumber) {
    questions[qNumber].questionNumber.toString().length == 1 ? questionNumber.textContent = "0" + questions[qNumber].questionNumber + "." : questionNumber.textContent = questions[qNumber].questionNumber + ".";
    questionText.textContent = questions[qNumber].question;
    A.textContent = questions[qNumber].alt1;
    B.textContent = questions[qNumber].alt2;
    C.textContent = questions[qNumber].alt3;
    D.textContent = questions[qNumber].alt4;
    A.setAttribute("value", questions[qNumber].questionNumber - 1);
    B.setAttribute("value", questions[qNumber].questionNumber - 1);
    C.setAttribute("value", questions[qNumber].questionNumber - 1);
    D.setAttribute("value", questions[qNumber].questionNumber - 1);
    questionNumber.setAttribute("value", questions[qNumber].questionNumber - 1);
    textAll.setAttribute("value", questions[qNumber].questionNumber - 1);
    text20.setAttribute("value", questions[qNumber].questionNumber - 1);
    updateProgress(qNumber);
}

function calculateFailuresNumber() {
    const fail = parseInt(localStorage.getItem("fail"));
    const failNumber = fail + 1;

    localStorage.setItem("fail", failNumber);
}

function showGameOverScreen() {
    quiz.style.display = "none";
    gameOverBackground.style.display = "block";

    setTimeout(() => {
        gameOverText.classList.add("animate");
    }, 100);

    setTimeout(() => {
        gameOverBtn.style.visibility = "visible";
        gameOverBtn.classList.add("animate");
    }, 800);

    calculateFailuresNumber();
}

function showGameOverScreenBonus() {
    quiz.style.display = "none";
    gameOverText.classList.add("bonus");
    gameOverBtn.classList.add("bonus");
    gameOverBackground.classList.add("bonus");
    gameOverBackground.style.display = "block";

    setTimeout(() => {
        gameOverText.classList.add("animate");
    }, 100);

    setTimeout(() => {
        gameOverBtn.style.visibility = "visible";
        gameOverBtn.classList.add("animate");
    }, 800);
}

function calculateScore() {
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const fail = parseInt(localStorage.getItem("fail"));

    if (fail === 0) {
        const rankNumber = 6;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S+";

        if (rankNumber > recordScore || !recordScore) localStorage.setItem("recordScore", rankNumber);

    } else if (fail > 0 && fail <= 10) {
        const rankNumber = 5;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S";

        if (rankNumber > recordScore || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);

    } else if (fail > 10 && fail <= 40) {
        const rankNumber = 3;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A";

        if (rankNumber > recordScore || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);

    } else if (fail > 40) {
        const rankNumber = 1;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B";

        if (rankNumber > recordScore || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);
    }

    fail === 0 ? score.textContent = "Nenhuma falha" : score.textContent = `Falhas totais: ${fail}`;
}

function calculateScoreBonus() {
    const currentScore = parseInt(localStorage.getItem("currentScore"));
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const fail = parseInt(localStorage.getItem("fail"));

    if (fail === 0) {
        const rankNumber = 7;

        scoreTitle.textContent = "Rei dos piratas";
        rank.textContent = "S++";

        if (rankNumber > recordScore) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 5) {
        const rankNumber = 6;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S+";

        if (rankNumber > recordScore) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 3) {
        const rankNumber = 4;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A+";

        if (rankNumber > recordScore) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 1) {
        const rankNumber = 2;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B+";

        if (rankNumber > recordScore) localStorage.setItem("recordScore", rankNumber);
    }

    fail === 0 ? score.innerHTML = "Bônus Máximo" + "<br>" + "Adquirido" : score.textContent = "Bônus Adquirido";

    localStorage.removeItem("currentScore");
    localStorage.removeItem("fail");
}

function setFinalProgress() {
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));

    if (progress === 49) {
        localStorage.setItem("progress", 50);
    } else if (progress === 88 && recordScore < 7) {
        localStorage.setItem("progress", 90);
    } else if (recordScore === 7) {
        localStorage.setItem("progress", 100);
        star3.style.display = "block";
    }
}

function showScoreScreen() {
    quiz.style.display = "none";
    quizScore.style.display = "block";
    star1.style.display = "block";
    star1.style.pointerEvents = "all";
    localStorage.setItem("bonus", true);

    calculateScore();
    setFinalProgress();
}

function showScoreScreenBonus() {
    quiz.style.display = "none";
    quizScore.classList.add("bonus");
    quizScoreResult.classList.add("bonus");
    youWinText.classList.add("bonus");
    quizScoreText.forEach((text) => text.classList.add("bonus"));
    rank.classList.add("bonus");
    exitScoreBtn.classList.add("bonus");
    theEndText.classList.add("bonus");
    theEndText.textContent = "The End.";
    quizScore.style.display = "block";
    star1.style.pointerEvents = "none";
    star2.style.display = "block";
    localStorage.removeItem("bonus");

    calculateScoreBonus();
    setFinalProgress();
}

function checkAnswer(qNumber, answer) {
    const currentQuestionNumber = parseInt(qNumber.value);
    const chosenAnswer = answer.textContent;
    const rightAnswer = questions[currentQuestionNumber].answer;
    const bonus = instructionBtn.getAttribute("data-bonus");

    //activate secret answer
    if (currentQuestionNumber == 1 || currentQuestionNumber == 5 || currentQuestionNumber == 16) {
        questionNumber.style.pointerEvents = "visible";
        questionNumber.addEventListener("mouseover", () => questionSvgPath.setAttribute("fill", "#ccc733"));
        questionNumber.addEventListener("mouseout", () => questionSvgPath.setAttribute("fill", "#3fbadc"));
    } else {
        questionNumber.style.pointerEvents = "none";
        questionSvgPath.setAttribute("fill", "#3fbadc");
    }

    //activate secret answer
    if (currentQuestionNumber == 16) {
        text20.style.pointerEvents = "visible";
        text20.classList.add("active");
    } else {
        text20.style.pointerEvents = "none";
        text20.classList.remove("active");
    }

    //activate secret answer
    if (currentQuestionNumber == 31) {
        textAll.style.pointerEvents = "visible";
        textAll.classList.add("active");
    } else {
        textAll.style.pointerEvents = "none";
        textAll.classList.remove("active");
    }

    //check if it's the bonus quiz or not
    if (bonus == "false") {
        if (currentQuestionNumber == 49) {
            showScoreScreen();
        } else if (chosenAnswer === rightAnswer) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreen();
        }
    } else {
        if (currentQuestionNumber == 74) {
            showScoreScreenBonus();
        } else if (chosenAnswer === rightAnswer) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreenBonus();
        }
    }
}

function restartQuiz() {
    gameOverBackground.style.display = "none";
    quizMenu.style.display = "block";
    gameOverBtn.style.visibility = "hidden";
    gameOverText.classList.remove("animate");
    gameOverBtn.classList.remove("animate");

    const bonus = instructionBtn.getAttribute("data-bonus");

    //check if it's the bonus quiz
    if (bonus == "true") {
        gameOverText.classList.remove("bonus");
        gameOverBtn.classList.remove("bonus");
        gameOverBackground.classList.remove("bonus");
        resetInstructionBtn();
    };
}

function exitScoreScreen() {
    quizScore.style.display = "none";
    quizMenu.style.display = "block";

    const bonus = instructionBtn.getAttribute("data-bonus");

    //check if it's the bonus quiz
    if (bonus == "true") {
        quizScore.classList.remove("bonus");
        quizScoreResult.classList.remove("bonus");
        youWinText.classList.remove("bonus");
        quizScoreText.forEach((text) => text.classList.remove("bonus"));
        rank.classList.remove("bonus");
        exitScoreBtn.classList.remove("bonus");
        theEndText.classList.remove("bonus");
        theEndText.textContent = "The End?";
        resetInstructionBtn();
    }
}

function toggleInstructionBonus() {
    clicks = 0;
    star2.style.setProperty("--vis", "hidden");
    star2.style.setProperty("--op", 0);

    quizMenu.style.display = "none";

    const bonus = instructionBtn.getAttribute("data-bonus");
    bonus == "true" ? startQuizBonus() : quizInstruction.style.display = "flex";
}

function exitInstructionScreen() {
    quizInstruction.style.display = "none";
    quizMenu.style.display = "block";
}

function showProgressScreen() {
    clicks = 0;
    star2.style.setProperty("--vis", "hidden");
    star2.style.setProperty("--op", 0);

    quizMenu.style.display = "none";
    quizProgress.style.display = "block";

    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));

    !progress ? percentProgress.textContent = "Progresso atual: 0%" : percentProgress.textContent = `Progresso atual: ${progress}%`;

    if (recordScore === 7) {
        titleProgress.textContent = "Título: Rei dos Piratas";
        rankProgress.textContent = "Rank: S++";
    } else if (recordScore === 6) {
        titleProgress.textContent = "Título: Yonkou";
        rankProgress.textContent = "Rank: S+";
    } else if (recordScore === 5) {
        titleProgress.textContent = "Título: Yonkou";
        rankProgress.textContent = "Rank: S";
    } else if (recordScore === 4) {
        titleProgress.textContent = "Título: Supernova";
        rankProgress.textContent = "Rank: A+";
    } else if (recordScore === 3) {
        titleProgress.textContent = "Título: Supernova";
        rankProgress.textContent = "Rank: A";
    } else if (recordScore === 2) {
        titleProgress.textContent = "Título: Pirata Comum";
        rankProgress.textContent = "Rank: B+";
    } else if (recordScore === 1) {
        titleProgress.textContent = "Título: Pirata Comum";
        rankProgress.textContent = "Rank: B";
    } else {
        titleProgress.textContent = "Título: ???";
        rankProgress.textContent = "Rank: ???";
    }
}

function exitProgressScreen() {
    quizProgress.style.display = "none";
    quizMenu.style.display = "block";
}

function activateBonus() {
    instructionBtn.textContent = "???";
    instructionBtn.setAttribute("data-bonus", "true");

    instructionBtn.addEventListener("mouseover", () => {
        instructionBtn.textContent = "Bônus";
        instructionBtn.style.cssText = "background-color: #6a6a6a; border-color: #1a1a1a; color: #1a1a1a;";
    });

    instructionBtn.addEventListener("mouseout", () => {
        instructionBtn.textContent = "???";
        instructionBtn.style.cssText = "background-color: #9A6601; border-color: #983400;";
    });
}

function playMiniLuffyAudio() {
    miniLuffyAudio.volume = 0.3;
    miniLuffyAudio.currentTime = 0;
    miniLuffyAudio.play();
}

function twoDigits(time) {
    if (time < 10) { return "0" + time } else { return time };
}

function startTimer() {
    setInterval(() => {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
            if (min == 60) {
                h++;
                min = 0;
            }
        }
        timeProgress.textContent = `Tempo de jogo: ${twoDigits(h)}:${twoDigits(min)}:${twoDigits(sec)}`;
    }, 1000);
}

function clickStar2() {
    clearTimeout(timeoutHandle);
    clicks++;

    if (clicks === 1) {
        star2.setAttribute("data-before", "Não tem nada aqui.");
    } else if (clicks === 2) {
        star2.setAttribute("data-before", "Não insista!");
    } else if (clicks === 3) {
        star2.setAttribute("data-before", "Eu já falei...");
    } else if (clicks === 4) {
        star2.setAttribute("data-before", "Não vai acontecer nada!");
    } else if (clicks === 5) {
        star2.setAttribute("data-before", "Você não cansa não?");
    } else if (clicks === 6) {
        star2.setAttribute("data-before", "Acha que tem coisa escondida é?");
    } else if (clicks === 7) {
        star2.setAttribute("data-before", "Ok...");
    } else if (clicks === 8) {
        star2.setAttribute("data-before", "Você venceu...");
    } else if (clicks === 9) {
        star2.setAttribute("data-before", "Dê o seu máximo! (Lá ele)");
    } else if (clicks > 9 && clicks < 100) {
        star2.setAttribute("data-before", `x${clicks}`);
    } else if (clicks === 100) {
        star2.setAttribute("data-before", "Você é maluco!");
    } else if (clicks === 101) {
        star2.setAttribute("data-before", "Tudo isso atrás de um segredinho?");
    } else if (clicks === 102) {
        onePieceOp.volume = 0.1;
        onePieceOp.play();
        star2.setAttribute("data-before", "Pois bem...");
    }

    star2.style.setProperty("--vis", "visible");
    star2.style.setProperty("--op", 1);

    timeoutHandle = setTimeout(() => {
        star2.style.setProperty("--vis", "hidden");
        star2.style.setProperty("--op", 0);
    }, 2000);
}

if (startBtn) startBtn.addEventListener("click", startQuiz);
if (instructionBtn) instructionBtn.addEventListener("click", toggleInstructionBonus);
if (exitInstructionBtn) exitInstructionBtn.addEventListener("click", exitInstructionScreen);
if (progressBtn) progressBtn.addEventListener("click", showProgressScreen);
if (exitProgressBtn) exitProgressBtn.addEventListener("click", exitProgressScreen);
if (exitScoreBtn) exitScoreBtn.addEventListener("click", exitScoreScreen);
if (gameOverBtn) gameOverBtn.addEventListener("click", restartQuiz);
if (star1) star1.addEventListener("click", activateBonus);
if (star2) star2.addEventListener("click", clickStar2);
if (star3) star3.addEventListener("click", () => window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
if (miniLuffy) miniLuffy.addEventListener("click", playMiniLuffyAudio);