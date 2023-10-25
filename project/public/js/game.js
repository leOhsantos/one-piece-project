const body = document.getElementsByTagName("body")[0];

const quizMenu = document.querySelector(".quiz-menu");
const quizInstruction = document.querySelector(".quiz-instruction");
const startBtn = document.getElementById("startBtn");
const instructionBtn = document.getElementById("instructionBtn");
const exitInstructionBtn = document.getElementById("exitInstructionBtn");
const progressBtn = document.getElementById("progressBtn");
const exitProgressBtn = document.getElementById("exitProgressBtn");
const exitBtn = document.getElementById("exitBtn");

const quizProgress = document.querySelector(".quiz-progress");
const percentProgress = document.getElementById("percentProgress");
const titleProgress = document.getElementById("titleProgress");
const rankProgress = document.getElementById("rankProgress");
const gameBeatProgress = document.getElementById("gameBeatProgress");
const resetNumberProgress = document.getElementById("resetNumberProgress");
const resetProgressBackground = document.querySelector(".reset-progress-background");
const resetProgressWarning = document.querySelector(".reset-progress-warning");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const cancelResetProgressBtn = document.getElementById("cancelResetProgressBtn");
const confirmResetProgressBtn = document.getElementById("confirmResetProgressBtn");

const quiz = document.querySelector(".quiz");
const jollyRogerLuffy = document.getElementById("jollyRogerLuffy");
const jollyRogerTeach = document.getElementById("jollyRogerTeach");
const answers = document.querySelectorAll(".answer");
const footerText = document.querySelector(".quiz-footer-text");
const questionNumberIcon = document.querySelector(".question-number-icon");
const questionSvg = document.querySelector(".question-svg");
const questionSvgPath = document.getElementById("svgPath");
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

const gameOverBtn = document.getElementById("gameOverBtn");
const gameOverText = document.querySelector(".game-over-text");
const gameOverBackground = document.querySelector(".game-over");

const quizScore = document.querySelector(".quiz-score");
const quizScoreResult = document.querySelector(".quiz-score-result");
const youWinText = document.querySelector(".you-win-text");
const quizScoreText = document.querySelectorAll(".quiz-score-text");
const scoreTitle = document.getElementById("scoreTitle");
const time = document.getElementById("time");
const score = document.getElementById("score");
const rank = document.querySelector(".rank");
const warningScoreText = document.querySelector(".warning-score-text");
const theEndText = document.querySelector(".the-end-text");
const exitScoreBtn = document.getElementById("exitScoreBtn");

const star1 = document.querySelector(".star-1");

const star2 = document.querySelector(".star-2");
let star2TimeoutHandle = null;
let clicks = 0;
let secretWord = "";

const star3 = document.querySelector(".star-3");
const video = document.getElementById("video");
const videoBackground = document.querySelector(".video-background");

const miniLuffy = document.querySelector(".mini-luffy-container");
const miniLuffyAudio = document.getElementById("miniLuffyAudio");
const onePieceOp = document.getElementById("onePieceOp");

const timeProgress = document.getElementById("timeProgress");
let sec = 0;
let min = 0;
let h = 0;

const recordTimeProgress = document.getElementById("recordTimeProgress");
let recordTimerTimeoutHandle = null;
let milR = 0;
let secR = 0;
let minR = 0;
let hR = 0;

let bonusProgress = null;

document.addEventListener("contextmenu", event => event.preventDefault());

window.addEventListener("beforeunload", () => {
    //save the timer when the page is refreshed
    localStorage.setItem("timer", JSON.stringify({
        "second": sec,
        "minute": min,
        "hour": h
    }));
});

document.addEventListener("DOMContentLoaded", () => {
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));
    const isBonusActivated = localStorage.getItem("bonus");
    const timer = JSON.parse(localStorage.getItem("timer"));
    const recordTime = JSON.parse(localStorage.getItem("recordTime"));
    const gameBeat = parseInt(localStorage.getItem("gameBeat"));
    const reset = parseInt(localStorage.getItem("reset"));

    //show the stars on menu
    if (progress >= 50 && progress < 100) {
        if (star1) star1.style.display = "block";
    } else if (progress === 100 && recordScore < 7) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        resetProgressBtn.style.display = "flex";
    } else if (recordScore === 7) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        if (star3) star3.style.display = "block";
        resetProgressBtn.style.display = "flex";
    } else if (!progress) {
        if (star1) star1.style.display = "none";
        if (star2) star2.style.display = "none";
        if (star3) star3.style.display = "none";
    }

    //verify if bonus is activated to activate star 1 secret click
    if (star1) isBonusActivated ? star1.style.pointerEvents = "all" : star1.style.pointerEvents = "none";

    //start the timer when the page is loaded
    if (!timer) {
        startTimer();
    } else {
        if (timer.second) sec = timer.second;
        if (timer.minute) min = timer.minute;
        if (timer.hour) h = timer.hour;
        startTimer();
    }

    //get the last record time the player did
    if (recordTime && progress < 100) {
        if (recordTime.millisecond) milR = recordTime.millisecond;
        if (recordTime.second) secR = recordTime.second;
        if (recordTime.minute) minR = recordTime.minute;
        if (recordTime.hour) hR = recordTime.hour;
    }

    if (!progress) localStorage.setItem("progress", 0);
    if (!gameBeat) localStorage.setItem("gameBeat", 0);
    if (!reset) localStorage.setItem("reset", 0);

    if (reset > 0 && progress > 0) resetProgressBtn.style.display = "flex";
});

function updateProgress(qNumber) {
    const currentProgress = questions[qNumber].questionNumber;
    const progress = localStorage.getItem("progress");
    const reset = parseInt(localStorage.getItem("reset"));

    if (currentProgress > 50) {
        bonusProgress += 2;
        if (bonusProgress > progress) localStorage.setItem("progress", bonusProgress);
    } else if (currentProgress > progress) {
        localStorage.setItem("progress", currentProgress - 1);
    }

    if (currentProgress - 1 >= 1 && reset >= 1) resetProgressBtn.style.display = "flex";
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

function twoDigits(time) {
    return time < 10 ? "0" + time : time;
}

function stopRecordTimer() {
    clearTimeout(recordTimerTimeoutHandle);

    const progress = parseInt(localStorage.getItem("progress"));

    if (progress < 100 || !progress) {
        localStorage.setItem("recordTime", JSON.stringify({
            "millisecond": milR,
            "second": secR,
            "minute": minR,
            "hour": hR
        }));
    }
}

function startRecordTimer() {
    recordTimerTimeoutHandle = setInterval(() => {
        milR++;
        if (milR == 99) {
            secR++;
            milR = 0;
            if (secR == 60) {
                minR++;
                secR = 0;
                if (minR == 60) {
                    hR++;
                    minR = 0;
                }
            }
        }
    }, 10);
}

function resetStar2Clicks() {
    clicks = 0;
    secretWord = "";
    star2.style.setProperty("--vis", "hidden");
    star2.style.setProperty("--op", 0);
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
    if (!fail) localStorage.setItem("fail", 0);
}

function startQuizBonus() {
    bonusProgress = 50;

    startRecordTimer();
    addBonusAttributes();

    body.style.cssText = `
    background: linear-gradient(0deg, rgba(39, 46, 50, 0.86) 0%, rgba(39, 46, 50, 0.86) 100%), url("../assets/image/general-background.png");
    background-position: center;
    background-repeat: repeat;
    background-size: 30%;
    `;

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

function countFailures() {
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

    countFailures();
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
    const progress = parseInt(localStorage.getItem("progress"));
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const fail = parseInt(localStorage.getItem("fail"));
    let rankNumber = 0;

    if (fail >= 0 && fail < 5) {
        rankNumber = 5;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);

    } else if (fail >= 5 && fail <= 10) {
        rankNumber = 3;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);

    } else if (fail > 10) {
        rankNumber = 1;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) localStorage.setItem("recordScore", rankNumber);
        localStorage.setItem("currentScore", rankNumber);
    }

    fail === 0 ? score.textContent = "Nenhuma falha" : score.textContent = `Falhas totais: ${fail}`;

    localStorage.setItem("bonus", true);
}

function calculateScoreBonus() {
    const currentScore = parseInt(localStorage.getItem("currentScore"));
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));
    let rankNumber = 0;

    if (currentScore === 5 && minR < 1) {
        rankNumber = 7;

        scoreTitle.textContent = "Rei dos piratas";
        rank.textContent = "S++";

        if (rankNumber > recordScore && progress < 100) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 5 && minR >= 1) {
        rankNumber = 6;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S+";

        if (rankNumber > recordScore && progress < 100) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 3) {
        rankNumber = 4;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A+";

        if (rankNumber > recordScore && progress < 100) localStorage.setItem("recordScore", rankNumber);

    } else if (currentScore === 1) {
        rankNumber = 2;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B+";

        if (rankNumber > recordScore && progress < 100) localStorage.setItem("recordScore", rankNumber);
    }

    rankNumber === 7 ? score.innerHTML = "Bônus Máximo" + "<br>" + "Adquirido" : score.textContent = "Bônus Adquirido";

    //format time display
    if (minR < 1) {
        time.textContent = `Tempo: ${twoDigits(secR)}.${parseInt(milR.toString().substring(0, 1))}`;
    } else if (minR >= 1 && hR < 1) {
        time.textContent = `Tempo: ${minR}:${twoDigits(secR)}`;
    } else if (hR >= 1) {
        time.textContent = `Tempo: ${twoDigits(hR)}:${twoDigits(minR)}:${twoDigits(secR)}`;
    }

    //reset record timer
    milR = 0;
    secR = 0;
    minR = 0;
    hR = 0;

    localStorage.removeItem("bonus");
    localStorage.removeItem("currentScore");
    localStorage.removeItem("fail");
}

function setFinalProgress() {
    const recordScore = parseInt(localStorage.getItem("recordScore"));
    const progress = parseInt(localStorage.getItem("progress"));

    if (progress === 49) {
        localStorage.setItem("progress", 50);
    } else if (progress === 98 && recordScore < 7) {
        localStorage.setItem("progress", 100);
        resetProgressBtn.style.display = "flex";
    } else if (recordScore === 7) {
        localStorage.setItem("progress", 100);
        star3.style.display = "block";
        resetProgressBtn.style.display = "flex";
    }
}

function showWarningScoreText() {
    const progress = parseInt(localStorage.getItem("progress"));
    progress === 100 ? warningScoreText.style.display = "block" : warningScoreText.style.display = "none";
}

function showScoreScreen() {
    time.style.display = "none";
    quiz.style.display = "none";
    quizScore.style.display = "block";
    star1.style.display = "block";
    star1.style.pointerEvents = "all";

    showWarningScoreText();
    stopRecordTimer();
    calculateScore();
    setFinalProgress();
}

function countGameBeat() {
    const progress = parseInt(localStorage.getItem("progress"));
    const gameBeat = parseInt(localStorage.getItem("gameBeat"));
    const gameBeatNumber = gameBeat + 1;

    if (progress < 100) {
        localStorage.setItem("gameBeat", gameBeatNumber);
        gameBeatProgress.textContent = `Total de zeradas: ${gameBeatNumber}`;
    }
}

function showScoreScreenBonus() {
    quiz.style.display = "none";
    quizScore.classList.add("bonus");
    quizScoreResult.classList.add("bonus");
    youWinText.classList.add("bonus");
    quizScoreText.forEach((text) => text.classList.add("bonus"));
    time.style.display = "block";
    rank.classList.add("bonus");
    warningScoreText.classList.add("bonus");
    exitScoreBtn.classList.add("bonus");
    theEndText.classList.add("bonus");
    theEndText.textContent = "The End.";
    quizScore.style.display = "block";
    star1.style.pointerEvents = "none";
    star2.style.display = "block";

    showWarningScoreText();
    countGameBeat();
    stopRecordTimer();
    calculateScoreBonus();
    setFinalProgress();
}

function checkAnswer(qNumber, answer) {
    const currentQuestionNumber = parseInt(qNumber.value);
    const chosenAnswer = answer.textContent;
    const rightAnswer = questions[currentQuestionNumber].answer;
    const decrypted = CryptoJS.AES.decrypt(rightAnswer, "questionAnswer").toString(CryptoJS.enc.Utf8);
    const bonus = instructionBtn.getAttribute("data-bonus");

    // function to encrypt the string
    // const encrypted = CryptoJS.AES.encrypt("text", "questionAnswer");

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
        if (currentQuestionNumber == 49 && chosenAnswer === decrypted) {
            showScoreScreen();
        } else if (chosenAnswer === decrypted) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreen();
        }
    } else {
        if (currentQuestionNumber == 74 && chosenAnswer === decrypted) {
            showScoreScreenBonus();
        } else if (chosenAnswer === decrypted) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreenBonus();
        }
    }
}

function restartQuiz() {
    body.style.cssText = `
    background: linear-gradient(0deg, rgba(27, 64, 83, 0.86) 0%, rgba(27, 64, 83, 0.86) 100%), url("../assets/image/general-background.png")';
    background-position: center;
    background-repeat: repeat;
    background-size: 30%;
    `;

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
    body.style.cssText = `
    background: linear-gradient(0deg, rgba(27, 64, 83, 0.86) 0%, rgba(27, 64, 83, 0.86) 100%), url("../assets/image/general-background.png")';
    background-position: center;
    background-repeat: repeat;
    background-size: 30%;
    `;

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
        warningScoreText.classList.remove("bonus");
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
    const gameBeat = parseInt(localStorage.getItem("gameBeat"));
    const reset = parseInt(localStorage.getItem("reset"));

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

    if (!recordTime || progress < 100) {
        recordTimeProgress.textContent = "Tempo decorrido: ???";
    } else {
        //format time display
        if (recordTime.minute < 1) {
            recordTimeProgress.textContent = `Tempo: ${twoDigits(recordTime.second)}.${parseInt(recordTime.millisecond.toString().substring(0, 1))}`;
        } else if (recordTime.minute >= 1 && recordTime.hour < 1) {
            recordTimeProgress.textContent = `Tempo decorrido: ${recordTime.minute}:${twoDigits(recordTime.second)}`;
        } else if (recordTime.hour >= 1) {
            recordTimeProgress.textContent = `Tempo decorrido: ${twoDigits(recordTime.hour)}:${twoDigits(recordTime.minute)}:${twoDigits(recordTime.second)}`;
        }
    }

    !gameBeat ? gameBeatProgress.textContent = "Total de zeradas: ???" : gameBeatProgress.textContent = `Total de zeradas: ${gameBeat}`;

    if (!reset) {
        resetNumberProgress.textContent = "";
    } else {
        reset === 1 ? resetNumberProgress.textContent = `(Você já resetou ${reset} vez)` : resetNumberProgress.textContent = `(Você já resetou ${reset} vezes)`;
    }
}

function exitProgressScreen() {
    quizProgress.style.display = "none";
    quizMenu.style.display = "block";
    resetInstructionBtn();
}

function resetProgress() {
    const reset = parseInt(localStorage.getItem("reset"));
    const resetNumber = reset + 1;

    percentProgress.textContent = "Progresso atual: 0%";
    titleProgress.textContent = "Título: ???";
    rankProgress.textContent = "Rank: ???";
    reset === 1 ? resetNumberProgress.textContent = `(Você já resetou ${reset} vez)` : resetNumberProgress.textContent = `(Você já resetou ${reset} vezes)`;
    resetProgressBtn.style.display = "none";

    recordTimeProgress.textContent = "Tempo decorrido: ???";
    milR = 0
    secR = 0;
    minR = 0;
    hR = 0;

    resetStar2Clicks();
    onePieceOp.pause();
    onePieceOp.currentTime = 0;

    star1.style.display = "none";
    star2.style.display = "none";
    star3.style.display = "none";

    resetProgressBackground.style.cssText = "opacity: 0; visibility: hidden";

    localStorage.removeItem("progress");
    localStorage.removeItem("recordScore");
    localStorage.removeItem("recordTime");
    localStorage.removeItem("fail");
    localStorage.setItem("reset", resetNumber);
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

function clickStar2() {
    clearTimeout(star2TimeoutHandle);
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
        star2.setAttribute("data-before", "Quanta curiosidade...");
    } else if (clicks === 9) {
        star2.setAttribute("data-before", "Você é insuportável!");
    } else if (clicks === 10) {
        star2.setAttribute("data-before", "Rapaz...");
    } else if (clicks === 11) {
        star2.setAttribute("data-before", "Não tem o que fazer não?");
    } else if (clicks === 12) {
        star2.setAttribute("data-before", "Você não leu o que eu te disse?");
    } else if (clicks === 13) {
        star2.setAttribute("data-before", "Totalmente questionável você chegar até aqui.");
    } else if (clicks === 14) {
        star2.setAttribute("data-before", "Tudo isso atrás de um segredo?");
    } else if (clicks === 15) {
        star2.setAttribute("data-before", "...");
    } else if (clicks === 16) {
        star2.setAttribute("data-before", '"NIKA"');

        document.addEventListener("keydown", (event) => {
            let key = event.key;
            let upperCaseKey = key.toUpperCase();

            if (upperCaseKey === "N" && secretWord === "") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey === "I" && secretWord.substring(0) === "N") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey === "K" && secretWord.substring(1) === "I") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey === "A" && secretWord.substring(2) === "K") {
                secretWord += upperCaseKey;
            }

            if (secretWord === "NIKA") {
                onePieceOp.volume = 0.1;
                onePieceOp.play();
            }
        });

        clicks = 16;
    }

    star2.style.setProperty("--vis", "visible");
    star2.style.setProperty("--op", 1);

    star2TimeoutHandle = setTimeout(() => {
        star2.style.setProperty("--vis", "hidden");
        star2.style.setProperty("--op", 0);
    }, 2000);
}

function clickStar3() {
    resetStar2Clicks();

    onePieceOp.pause();
    onePieceOp.currentTime = 0;

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
if (exitBtn) exitBtn.addEventListener("click", () => window.location.href = "home.html");
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