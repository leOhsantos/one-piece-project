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
const resetProgressBackground = document.querySelector(".reset-progress-background");
const resetProgressWarning = document.querySelector(".reset-progress-warning");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const cancelResetProgressBtn = document.getElementById("cancelResetProgressBtn");
const confirmResetProgressBtn = document.getElementById("confirmResetProgressBtn");
const theEndText = document.querySelector(".the-end-text");
const exitScoreBtn = document.getElementById("exitScoreBtn");
const questionNumberIcon = document.querySelector(".question-number-icon");
const questionSvg = document.querySelector(".question-svg");
const questionSvgPath = document.getElementById("svgPath");

const star1 = document.querySelector(".star-1");

const star3 = document.querySelector(".star-3");
const video = document.getElementById("video");
const videoBackground = document.querySelector(".video-background");

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

const recordTimeProgress = document.getElementById("recordTimeProgress");
let recordTimerTimeoutHandle = null;
let secR = 0;
let minR = 0;
let hR = 0;

let bonusProgress = null;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.querySelector(".question-text");
const textAll = document.getElementById("textAll");
const myName = document.getElementById("name");
const text2 = document.getElementById("text2");
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
    const recordTime = JSON.parse(localStorage.getItem("recordTime"));

    if (progress >= 50 && progress < 90) {
        if (star1) star1.style.display = "block";
    } else if (progress === 90) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
    } else if (progress === 100) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        if (star3) star3.style.display = "block";
        resetProgressBtn.style.display = "flex";
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

    if (recordTime) {
        if (recordTime.second) secR = recordTime.second;
        if (recordTime.minute) minR = recordTime.minute;
        if (recordTime.hour) hR = recordTime.hour;
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
    const bonus = instructionBtn.getAttribute("data-bonus");

    if (bonus == "true") {
        instructionBtn.setAttribute("data-bonus", "false");
        instructionBtn.textContent = "Instruções";

        instructionBtn.addEventListener("mouseover", () => {
            instructionBtn.textContent = "Instruções";
            instructionBtn.style.cssText = "background-color: #ccc733; border-color: #983400; color: #000000;";
        });

        instructionBtn.addEventListener("mouseout", () => {
            instructionBtn.textContent = "Instruções";
            instructionBtn.style.cssText = "background-color: #9A6601; border-color: #983400; color: #000000;";
        });
    }
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
    resetStar2Clicks();
    startRecordTimer();
    removeBonusAttributes();

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
    myName.setAttribute("value", q1.questionNumber);
    text2.setAttribute("value", q1.questionNumber);
    text20.setAttribute("value", q1.questionNumber);

    const fail = localStorage.getItem("fail");
    const progress = localStorage.getItem("progress");

    if (!fail) localStorage.setItem("fail", 0);
    if (!progress) localStorage.setItem("progress", 0);
}

function startQuizBonus() {
    bonusProgress = 50;

    startRecordTimer();
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
    myName.setAttribute("value", questions[qNumber].questionNumber - 1);
    text2.setAttribute("value", questions[qNumber].questionNumber - 1);
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
    stopRecordTimer();
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

    stopRecordTimer();
}

function calculateScore() {
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const fail = parseInt(localStorage.getItem("fail"));

    if (fail === 0) {
        const rankNumber = 6;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S+";

        if (rankNumber > recordScore || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);

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

    if (currentScore === 6) {
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

    currentScore === 6 ? score.innerHTML = "Bônus Máximo" + "<br>" + "Adquirido" : score.textContent = "Bônus Adquirido";

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
        resetProgressBtn.style.display = "flex";
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
    stopRecordTimer();
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
    stopRecordTimer();
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
    if (currentQuestionNumber == 25) {
        text2.style.pointerEvents = "visible";
        text2.classList.add("active");
    } else {
        text2.style.pointerEvents = "none";
        text2.classList.remove("active");
    }

    //activate secret answer
    if (currentQuestionNumber == 31 || currentQuestionNumber == 73) {
        textAll.style.pointerEvents = "visible";
        textAll.classList.add("active");
    } else {
        textAll.style.pointerEvents = "none";
        textAll.classList.remove("active");
    }

    //activate secret answer
    if (currentQuestionNumber == 40) {
        myName.style.pointerEvents = "visible";
        myName.classList.add("active");
    } else {
        myName.style.pointerEvents = "none";
        myName.classList.remove("active");
    }

    //check if it's the bonus quiz or not
    if (bonus == "false") {
        if (currentQuestionNumber == 49 && chosenAnswer === rightAnswer) {
            showScoreScreen();
        } else if (chosenAnswer === rightAnswer) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreen();
        }
    } else {
        if (currentQuestionNumber == 74 && chosenAnswer === rightAnswer) {
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
    resetStar2Clicks();

    quizMenu.style.display = "none";

    const bonus = instructionBtn.getAttribute("data-bonus");
    bonus == "true" ? startQuizBonus() : quizInstruction.style.display = "flex";
}

function exitInstructionScreen() {
    quizInstruction.style.display = "none";
    quizMenu.style.display = "block";
}

function showProgressScreen() {
    resetStar2Clicks();

    quizMenu.style.display = "none";
    quizProgress.style.display = "flex";

    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));
    const recordTime = JSON.parse(localStorage.getItem("recordTime"));

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

    progress === 100 ? recordTimeProgress.textContent = `Tempo de speedrun: ${twoDigits(recordTime.hour)}:${twoDigits(recordTime.minute)}:${twoDigits(recordTime.second)}` : recordTimeProgress.textContent = "Tempo de speedrun: ???";
}

function exitProgressScreen() {
    quizProgress.style.display = "none";
    quizMenu.style.display = "block";
    resetInstructionBtn();
}

function resetProgress() {
    percentProgress.textContent = "Progresso atual: 0%";
    titleProgress.textContent = "Título: ???";
    rankProgress.textContent = "Rank: ???";
    recordTimeProgress.textContent = "Tempo de speedrun: ???";
    resetProgressBtn.style.display = "none";

    star1.style.display = "none";
    star2.style.display = "none";
    star3.style.display = "none";

    localStorage.removeItem("progress");
    localStorage.removeItem("recordScore");
    localStorage.removeItem("recordTime");
    localStorage.removeItem("fail");

    resetProgressBackground.style.cssText = "opacity: 0; visibility: hidden";
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
    return time < 10 ? "0" + time : time;
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
        timeProgress.textContent = `Tempo total de jogo: ${twoDigits(h)}:${twoDigits(min)}:${twoDigits(sec)}`;
    }, 1000);
}

function stopRecordTimer() {
    const progress = parseInt(localStorage.getItem("progress"));

    if (progress < 100) {
        clearTimeout(recordTimerTimeoutHandle);

        localStorage.setItem("recordTime", JSON.stringify({
            "second": secR,
            "minute": minR,
            "hour": hR
        }));
    }
}

function startRecordTimer() {
    const progress = parseInt(localStorage.getItem("progress"));

    if (progress === 100) {
        clearTimeout(recordTimerTimeoutHandle)
    } else {
        recordTimerTimeoutHandle = setInterval(() => {
            secR++;
            if (secR == 60) {
                minR++;
                secR = 0;
                if (minR == 60) {
                    hR++;
                    minR = 0;
                }
            }
        }, 1000);
    }
}

function resetStar2Clicks() {
    clicks = 0;
    star2.style.setProperty("--vis", "hidden");
    star2.style.setProperty("--op", 0);
}

function clickStar2() {
    clearTimeout(timeoutHandle);
    clicks++;

    if (clicks === 1) {
        star2.setAttribute("data-before", "Não tem nada aqui.");
    } else if (clicks === 2) {
        star2.setAttribute("data-before", "Não insista.");
    } else if (clicks === 3) {
        star2.setAttribute("data-before", "Eu já falei...");
    } else if (clicks === 4) {
        star2.setAttribute("data-before", "Não vai acontecer nada.");
    } else if (clicks === 5) {
        star2.setAttribute("data-before", "Você não cansa não?");
    } else if (clicks === 6) {
        star2.setAttribute("data-before", "Acha que tem coisa escondida é?");
    } else if (clicks === 7) {
        star2.setAttribute("data-before", "Vai clicar até quando amigo?");
    } else if (clicks === 8) {
        star2.setAttribute("data-before", "Que chatisse hein!");
    } else if (clicks === 9) {
        star2.setAttribute("data-before", "Você é insuportável!");
    } else if (clicks === 10) {
        star2.setAttribute("data-before", "Rapaz...");
    } else if (clicks === 11) {
        star2.setAttribute("data-before", "Não tem o que fazer não?");
    } else if (clicks === 12) {
        star2.setAttribute("data-before", "Eu não aguento mais!");
    } else if (clicks === 13) {
        star2.setAttribute("data-before", "Você é maluco!");
    } else if (clicks === 14) {
        star2.setAttribute("data-before", "Tudo isso atrás de um segredo?");
    } else if (clicks === 15) {
        star2.setAttribute("data-before", "...");
    } else if (clicks >= 16) {
        onePieceOp.volume = 0.1;
        onePieceOp.play();
        star2.setAttribute("data-before", "♪♪♪");
    }

    star2.style.setProperty("--vis", "visible");
    star2.style.setProperty("--op", 1);

    timeoutHandle = setTimeout(() => {
        star2.style.setProperty("--vis", "hidden");
        star2.style.setProperty("--op", 0);
    }, 2000);
}

function clickStar3() {
    onePieceOp.pause();

    videoBackground.style.cssText = "opacity: 1; visibility: visible";
    video.volume = 0.1;
    video.play();

    video.addEventListener("ended", () => {
        video.currentTime = 0;
        videoBackground.style.cssText = "opacity: 0; visibility: hidden";
    });
}

if (startBtn) startBtn.addEventListener("click", startQuiz);
if (instructionBtn) instructionBtn.addEventListener("click", toggleInstructionBonus);
if (exitInstructionBtn) exitInstructionBtn.addEventListener("click", exitInstructionScreen);
if (progressBtn) progressBtn.addEventListener("click", showProgressScreen);
if (resetProgressBtn) resetProgressBtn.addEventListener("click", () => resetProgressBackground.style.cssText = "opacity: 1; visibility: visible");
if (cancelResetProgressBtn) cancelResetProgressBtn.addEventListener("click", () => resetProgressBackground.style.cssText = "opacity: 0; visibility: hidden");
if (confirmResetProgressBtn) confirmResetProgressBtn.addEventListener("click", resetProgress);
if (exitProgressBtn) exitProgressBtn.addEventListener("click", exitProgressScreen);
if (exitScoreBtn) exitScoreBtn.addEventListener("click", exitScoreScreen);
if (gameOverBtn) gameOverBtn.addEventListener("click", restartQuiz);
if (star1) star1.addEventListener("click", activateBonus);
if (star2) star2.addEventListener("click", clickStar2);
if (star3) star3.addEventListener("click", clickStar3);
if (miniLuffy) miniLuffy.addEventListener("click", playMiniLuffyAudio);