const body = document.getElementsByTagName("body")[0];

const quizMenu = document.querySelector(".quiz-menu");
const quizInstruction = document.querySelector(".quiz-instruction");
const startBtn = document.getElementById("startBtn");
const instructionBtn = document.getElementById("instructionBtn");
const exitInstructionBtn = document.getElementById("exitInstructionBtn");
const progressBtn = document.getElementById("progressBtn");
const exitProgressBtn = document.getElementById("exitProgressBtn");
const creditsBtn = document.getElementById("creditsBtn");
const feedbackBtn = document.getElementById("feedbackBtn");

const quizFeedback = document.querySelector(".quiz-feedback");
const feedbackText = document.querySelector(".feedback-text");
const feedbackStar1 = document.getElementById("feedbackStar1");
const feedbackStar2 = document.getElementById("feedbackStar2");
const feedbackStar3 = document.getElementById("feedbackStar3");
const feedbackStar4 = document.getElementById("feedbackStar4");
const feedbackStar5 = document.getElementById("feedbackStar5");
const rateBtn = document.getElementById("rateBtn");
const exitFeedbackBtn = document.getElementById("exitFeedbackBtn");
let starsNumber = 0;
let isRated = false;

const quizCredits = document.querySelector(".quiz-credits");
const exitCreditsBtn = document.getElementById("exitCreditsBtn");

const quizProgress = document.querySelector(".quiz-progress");
const percentProgress = document.getElementById("percentProgress");
const titleProgress = document.getElementById("titleProgress");
const rankProgress = document.getElementById("rankProgress");
const resetProgressBackground = document.querySelector(".reset-progress-background");
const resetProgressWarning = document.querySelector(".reset-progress-warning");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const cancelResetProgressBtn = document.getElementById("cancelResetProgressBtn");
const confirmResetProgressBtn = document.getElementById("confirmResetProgressBtn");
const rankingListTbody = document.getElementById("rankingListTbody");
const playerRank = document.querySelector(".player-rank");
let bonusProgress = null;

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

const recordTimeProgress = document.getElementById("recordTimeProgress");
let recordTimerIntervalHandle = null;
let milR = 0;
let secR = 0;
let minR = 0;
let hR = 0;

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
    body.classList.add("gray");
    menu.classList.add("gray");
    settingsContainer.classList.add("gray");
    confirmLogoutModal.classList.add("gray");
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

function startRecordTimer() {
    recordTimerIntervalHandle = setInterval(() => {
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

function stopRecordTimer() {
    clearInterval(recordTimerIntervalHandle);

    const progress = parseInt(sessionStorage.getItem("progress"));

    if (progress < 100 || !progress) {
        sessionStorage.setItem("recordTime", JSON.stringify({
            "millisecond": milR,
            "second": secR,
            "minute": minR,
            "hour": hR
        }));
    }
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

    q1.questionNumber.toString().length == 1 ? questionNumber.textContent = `0${q1.questionNumber}.` : questionNumber.textContent = `${q1.questionNumber}.`;
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
}

if (startBtn) startBtn.addEventListener("click", startQuiz);

window.addEventListener("load", () => {
    const recordScore = parseInt(sessionStorage.getItem("recordScore"));
    const progress = parseInt(sessionStorage.getItem("progress"));
    const fail = sessionStorage.getItem("fail");
    const isBonusActivated = sessionStorage.getItem("bonus");
    const recordTime = JSON.parse(sessionStorage.getItem("recordTime"));

    //get the player feedback stars
    fetch(`/feedback/list-by-player/${idPlayer}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    starsNumber = res[0].stars;
                }
            });
        });

    //show the stars on menu
    if (progress >= 50 && progress < 100) {
        if (star1) star1.style.display = "block";
    } else if (progress == 100 && recordScore < 7) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        resetProgressBtn.style.display = "flex";
    } else if (recordScore == 7) {
        if (star1) star1.style.display = "block";
        if (star2) star2.style.display = "block";
        if (star3) star3.style.display = "block";
        resetProgressBtn.style.display = "flex";
    } else if (!progress) {
        if (star1) star1.style.display = "none";
        if (star2) star2.style.display = "none";
        if (star3) star3.style.display = "none";
    }

    //blocks the player if he tries to start a new game
    if (progress == 100) {
        startBtn.removeEventListener("click", startQuiz);
        startBtn.style.cursor = "no-drop";
    }

    //verify if bonus is activated to activate star 1 secret click
    if (star1) isBonusActivated ? star1.style.pointerEvents = "all" : star1.style.pointerEvents = "none";

    //get the last record time the player did
    if (recordTime && progress < 100) {
        if (recordTime.millisecond) milR = recordTime.millisecond;
        if (recordTime.second) secR = recordTime.second;
        if (recordTime.minute) minR = recordTime.minute;
        if (recordTime.hour) hR = recordTime.hour;
    }

    if (!progress) sessionStorage.setItem("progress", 0);
    if (!fail) sessionStorage.setItem("fail", 0);
    if (progress > 0) resetProgressBtn.style.display = "flex";
});

function startQuizBonus() {
    bonusProgress = 50;

    startRecordTimer();
    addBonusAttributes();

    quizMenu.style.display = "none";
    quiz.style.display = "block";

    questionNumber.textContent = `${q51.questionNumber}.`;
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

function updateProgress(qNumber) {
    const currentProgress = questions[qNumber].questionNumber;
    const progress = sessionStorage.getItem("progress");

    if (currentProgress > 50) {
        bonusProgress += 2;
        if (bonusProgress > progress) sessionStorage.setItem("progress", bonusProgress);
    } else if (currentProgress > progress) {
        sessionStorage.setItem("progress", currentProgress - 1);
    }

    if (currentProgress - 1 >= 1) resetProgressBtn.style.display = "flex";
}

function nextQuestion(qNumber) {
    questions[qNumber].questionNumber.toString().length == 1 ? questionNumber.textContent = `0${questions[qNumber].questionNumber}.` : questionNumber.textContent = `${questions[qNumber].questionNumber}.`;
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

function setFinalProgress() {
    const recordScore = parseInt(sessionStorage.getItem("recordScore"));
    const progress = parseInt(sessionStorage.getItem("progress"));

    if (progress == 49) {
        sessionStorage.setItem("progress", 50);
    } else if (progress == 98 && recordScore < 7) {
        sessionStorage.setItem("progress", 100);
        resetProgressBtn.style.display = "flex";
    } else if (recordScore == 7) {
        sessionStorage.setItem("progress", 100);
        star3.style.display = "block";
        resetProgressBtn.style.display = "flex";
    }
}

function saveScore(rank, speedrunTime) {
    fetch(`/score/save/${idPlayer}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rank: rank,
            speedrunTime: speedrunTime
        })
    });
}

function calculateScore() {
    const progress = parseInt(sessionStorage.getItem("progress"));
    const recordScore = parseInt(sessionStorage.getItem("recordScore"));
    const fail = parseInt(sessionStorage.getItem("fail"));
    let rankNumber = 0;

    if (fail >= 0 && fail < 5) {
        rankNumber = 5;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) sessionStorage.setItem("recordScore", rankNumber);
        sessionStorage.setItem("currentScore", rankNumber);

    } else if (fail >= 5 && fail <= 10) {
        rankNumber = 3;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) sessionStorage.setItem("recordScore", rankNumber);
        sessionStorage.setItem("currentScore", rankNumber);

    } else if (fail > 10) {
        rankNumber = 1;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B";

        if ((rankNumber > recordScore && progress < 100) || !recordScore) sessionStorage.setItem("recordScore", rankNumber);
        sessionStorage.setItem("currentScore", rankNumber);
    }

    fail == 0 ? score.textContent = "Nenhuma falha" : score.textContent = `Falhas totais: ${fail}`;

    sessionStorage.setItem("bonus", true);

    saveScore(rankNumber, "00:00:00.0");
}

function twoDigits(time) {
    return time < 10 ? "0" + time : time;
}

function calculateScoreBonus() {
    const currentScore = parseInt(sessionStorage.getItem("currentScore"));
    const recordScore = parseInt(sessionStorage.getItem("recordScore"));
    const progress = parseInt(sessionStorage.getItem("progress"));
    const fail = parseInt(sessionStorage.getItem("fail"));
    let rankNumber = 0;
    let speedrunTime = `${twoDigits(hR)}:${twoDigits(minR)}:${twoDigits(secR)}.${parseInt(milR.toString().substring(0, 1))}`;

    if (currentScore == 5 && minR < 1 && fail == 0) {
        rankNumber = 7;

        scoreTitle.textContent = "Rei dos piratas";
        rank.textContent = "S++";

        if (rankNumber > recordScore && progress < 100) sessionStorage.setItem("recordScore", rankNumber);

    } else if (currentScore == 5) {
        rankNumber = 6;

        scoreTitle.textContent = "Yonkou";
        rank.textContent = "S+";

        if (rankNumber > recordScore && progress < 100) sessionStorage.setItem("recordScore", rankNumber);

    } else if (currentScore == 3) {
        rankNumber = 4;

        scoreTitle.textContent = "Supernova";
        rank.textContent = "A+";

        if (rankNumber > recordScore && progress < 100) sessionStorage.setItem("recordScore", rankNumber);

    } else if (currentScore == 1) {
        rankNumber = 2;

        scoreTitle.textContent = "Pirata Comum";
        rank.textContent = "B+";

        if (rankNumber > recordScore && progress < 100) sessionStorage.setItem("recordScore", rankNumber);
    }

    rankNumber == 7 ? score.innerHTML = "Bônus Máximo" + "<br>" + "Adquirido" : score.textContent = "Bônus Adquirido";

    //format time display
    if (minR < 1) {
        time.textContent = `Tempo: ${twoDigits(secR)}.${parseInt(milR.toString().substring(0, 1))}`;
    } else if (minR >= 1 && hR < 1) {
        time.textContent = `Tempo: ${minR}:${twoDigits(secR)}`;
    } else if (hR >= 1) {
        time.textContent = `Tempo: ${twoDigits(hR)}:${twoDigits(minR)}:${twoDigits(secR)}`;
    }

    sessionStorage.removeItem("bonus");
    sessionStorage.removeItem("currentScore");
    sessionStorage.removeItem("fail");

    saveScore(rankNumber, speedrunTime);
}

function showScoreScreen() {
    time.style.display = "none";
    quiz.style.display = "none";
    quizScore.style.display = "block";
    star1.style.display = "block";
    star1.style.pointerEvents = "all";

    stopRecordTimer();
    calculateScore();
    setFinalProgress();
    setTimeout(() => getScore(), 1000);
}

function showScoreScreenBonus() {
    quiz.style.display = "none";
    quizScore.classList.add("bonus");
    quizScoreResult.classList.add("bonus");
    youWinText.classList.add("bonus");
    quizScoreText.forEach((text) => text.classList.add("bonus"));
    time.style.display = "block";
    rank.classList.add("bonus");
    exitScoreBtn.classList.add("bonus");
    theEndText.classList.add("bonus");
    theEndText.textContent = "The End.";
    quizScore.style.display = "block";
    star1.style.pointerEvents = "none";
    star2.style.display = "block";
    startBtn.style.cursor = "no-drop";
    startBtn.removeEventListener("click", startQuiz);

    stopRecordTimer();
    calculateScoreBonus();
    setFinalProgress();
    setTimeout(() => getScore(), 1000);
}

function countFailures() {
    const fail = parseInt(sessionStorage.getItem("fail"));
    const failNumber = fail + 1;

    sessionStorage.setItem("fail", failNumber);
}

function saveQuestionError(questionNumber) {
    fetch(`/question-error/save/${idPlayer}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            questionNumber: questionNumber
        })
    });
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
    saveQuestionError(questionNumber.value > 1 ? Number(questionNumber.value) + 1 : Number(questionNumber.value));
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
    saveQuestionError(questionNumber.value > 1 ? Number(questionNumber.value) + 1 : Number(questionNumber.value));
}

function checkAnswer(qNumber, answer) {
    const currentQuestionNumber = parseInt(qNumber.value);
    const chosenAnswer = answer.textContent;
    const rightAnswer = questions[currentQuestionNumber].answer;
    const decrypted = CryptoJS.AES.decrypt(rightAnswer, "questionAnswer").toString(CryptoJS.enc.Utf8);
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
        if (currentQuestionNumber == 49 && chosenAnswer == decrypted) {
            showScoreScreen();
        } else if (chosenAnswer == decrypted) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreen();
        }
    } else {
        if (currentQuestionNumber == 74 && chosenAnswer == decrypted) {
            showScoreScreenBonus();
        } else if (chosenAnswer == decrypted) {
            nextQuestion(currentQuestionNumber + 1);
        } else {
            showGameOverScreenBonus();
        }
    }
}

function exitScoreScreen() {
    body.classList.remove("gray");
    menu.classList.remove("gray");
    settingsContainer.classList.remove("gray");
    confirmLogoutModal.classList.remove("gray");

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

if (exitScoreBtn) exitScoreBtn.addEventListener("click", exitScoreScreen);

function restartQuiz() {
    body.classList.remove("gray");
    menu.classList.remove("gray");
    settingsContainer.classList.remove("gray");
    confirmLogoutModal.classList.remove("gray");

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

if (gameOverBtn) gameOverBtn.addEventListener("click", restartQuiz);

function toggleInstructionBonus() {
    resetStar2Clicks();

    quizMenu.style.display = "none";

    const bonus = instructionBtn.getAttribute("data-bonus");
    bonus == "true" ? startQuizBonus() : quizInstruction.style.display = "flex";
}

if (instructionBtn) instructionBtn.addEventListener("click", toggleInstructionBonus);

function exitInstructionScreen() {
    quizInstruction.style.display = "none";
    quizMenu.style.display = "block";
}

if (exitInstructionBtn) exitInstructionBtn.addEventListener("click", exitInstructionScreen);

function showFeedbackScreen() {
    quizMenu.style.display = "none";
    quizFeedback.style.display = "flex";

    if (starsNumber > 0) {
        feedbackStar1.style.pointerEvents = "none";
        feedbackStar2.style.pointerEvents = "none";
        feedbackStar3.style.pointerEvents = "none";
        feedbackStar4.style.pointerEvents = "none";
        feedbackStar5.style.pointerEvents = "none";
        feedbackText.textContent = "Jogo já avaliado!";
        rateBtn.textContent = "Apagar";
        rateBtn.style.display = "inline-block";
        rateBtn.setAttribute("onclick", "deleteFeedback()");
        isRated = true;
    } else {
        feedbackStar1.style.pointerEvents = "all";
        feedbackStar2.style.pointerEvents = "all";
        feedbackStar3.style.pointerEvents = "all";
        feedbackStar4.style.pointerEvents = "all";
        feedbackStar5.style.pointerEvents = "all";
        feedbackText.textContent = "Dê uma nota para esse jogo!";
        rateBtn.textContent = "Avaliar";
        rateBtn.style.display = "inline-block";
        rateBtn.setAttribute("onclick", "saveFeedback()");
        isRated = false;
    }

    if (starsNumber > 0) {
        if (starsNumber == 1) {
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/empty-star.png";
            feedbackStar3.src = "../assets/image/empty-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starsNumber == 2) {
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/empty-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starsNumber == 3) {
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starsNumber == 4) {
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/full-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else {
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/full-star.png";
            feedbackStar5.src = "../assets/image/full-star.png";
        }
    }
}

if (feedbackBtn) feedbackBtn.addEventListener("click", showFeedbackScreen);

function exitFeedbackScreen() {
    quizMenu.style.display = "block";
    quizFeedback.style.display = "none";

    if (!isRated) {
        starsNumber = 0;
        feedbackStar1.src = "../assets/image/empty-star.png";
        feedbackStar2.src = "../assets/image/empty-star.png";
        feedbackStar3.src = "../assets/image/empty-star.png";
        feedbackStar4.src = "../assets/image/empty-star.png";
        feedbackStar5.src = "../assets/image/empty-star.png";
    }
}

if (exitFeedbackBtn) exitFeedbackBtn.addEventListener("click", exitFeedbackScreen);

function setStarNumber(star) {
    const starValue = star.getAttribute("data-value");

    if (!isRated) {
        if (starValue == 1) {
            starsNumber = 1;
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/empty-star.png";
            feedbackStar3.src = "../assets/image/empty-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starValue == 2) {
            starsNumber = 2;
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/empty-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starValue == 3) {
            starsNumber = 3;
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/empty-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else if (starValue == 4) {
            starsNumber = 4;
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/full-star.png";
            feedbackStar5.src = "../assets/image/empty-star.png";
        } else {
            starsNumber = 5;
            feedbackStar1.src = "../assets/image/full-star.png";
            feedbackStar2.src = "../assets/image/full-star.png";
            feedbackStar3.src = "../assets/image/full-star.png";
            feedbackStar4.src = "../assets/image/full-star.png";
            feedbackStar5.src = "../assets/image/full-star.png";
        }
    }
}

function deleteFeedback() {
    fetch(`/feedback/delete/${idPlayer}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    feedbackStar1.src = "../assets/image/empty-star.png";
    feedbackStar2.src = "../assets/image/empty-star.png";
    feedbackStar3.src = "../assets/image/empty-star.png";
    feedbackStar4.src = "../assets/image/empty-star.png";
    feedbackStar5.src = "../assets/image/empty-star.png";

    feedbackText.textContent = "Avaliação apagada com sucesso!";
    rateBtn.style.display = "none";
    rateBtn.setAttribute("onclick", "saveFeedback()");
    isRated = false;
}

function saveFeedback() {
    if (starsNumber > 0) {
        feedbackText.textContent = "Jogo avaliado com sucesso!";
        rateBtn.style.display = "none";
        isRated = true;

        fetch(`/feedback/save/${idPlayer}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stars: starsNumber
            })
        });
    }
}

function checkPlayerRank(rank) {
    if (rank == 7) {
        return "S++";
    } else if (rank == 6) {
        return "S+";
    } else if (rank == 5) {
        return "S";
    } else if (rank == 4) {
        return "A+";
    } else if (rank == 3) {
        return "A";
    } else if (rank == 2) {
        return "B+";
    } else if (rank == 1) {
        return "B";
    }
}

function showRankingTable() {
    let playerPosition = 0;

    for (let i = 0; i < rankingList.length; i++) {
        if (rankingList[i].fkPlayer == idPlayer) {
            playerPosition = i + 1;
        }

        if (rankingList[i].speedrunTime != "00:00:00.0") {
            rankingListTbody.innerHTML += `
            <tr>
            <td class="ranking-position">${i + 1}°</td>
            <td class="ranking-name">${rankingList[i].nickname}</td>
            <td class="ranking-rank">${checkPlayerRank(rankingList[i].rankPlayer)}</td>
            <td class="ranking-time">${rankingList[i].speedrunTime}</td>
            </tr>
            `;
        }
    }

    if (playerList && playerList.speedrunTime != "00:00:00.0") {
        playerRank.innerHTML = `
        <span class="ranking-position">${playerPosition}º</span>
        <span class="ranking-name">${playerList.nickname}</span>
        <span class="ranking-rank">${checkPlayerRank(playerList.rankPlayer)}</span>
        <span class="ranking-time">${playerList.speedrunTime}</span>
    `;
    } else {
        playerRank.innerHTML = `
        <span class="ranking-position">???º</span>
        <span class="ranking-name">???</span>
        <span class="ranking-rank">???</span>
        <span class="ranking-time">???</span>
    `;
    }
}

function showProgressScreen() {
    resetStar2Clicks();

    quizMenu.style.display = "none";
    quizProgress.style.display = "flex";
    rankingListTbody.innerHTML = "";

    const recordScore = parseInt(sessionStorage.getItem("recordScore"));
    const progress = parseInt(sessionStorage.getItem("progress"));
    const recordTime = JSON.parse(sessionStorage.getItem("recordTime"));

    percentProgress.textContent = `Progresso atual: ${progress}%`;

    if (recordScore == 7) {
        titleProgress.textContent = "Título: Rei dos Piratas";
        rankProgress.textContent = "Rank: S++";
    } else if (recordScore == 6) {
        titleProgress.textContent = "Título: Yonkou";
        rankProgress.textContent = "Rank: S+";
    } else if (recordScore == 5) {
        titleProgress.textContent = "Título: Yonkou";
        rankProgress.textContent = "Rank: S";
    } else if (recordScore == 4) {
        titleProgress.textContent = "Título: Supernova";
        rankProgress.textContent = "Rank: A+";
    } else if (recordScore == 3) {
        titleProgress.textContent = "Título: Supernova";
        rankProgress.textContent = "Rank: A";
    } else if (recordScore == 2) {
        titleProgress.textContent = "Título: Pirata Comum";
        rankProgress.textContent = "Rank: B+";
    } else if (recordScore == 1) {
        titleProgress.textContent = "Título: Pirata Comum";
        rankProgress.textContent = "Rank: B";
    } else {
        titleProgress.textContent = "Título: ???";
        rankProgress.textContent = "Rank: ???";
    }

    if (progress < 100) {
        recordTimeProgress.textContent = "Tempo decorrido: ???";
    } else {
        recordTimeProgress.textContent = `Tempo decorrido: ${twoDigits(recordTime.hour)}:${twoDigits(recordTime.minute)}:${twoDigits(recordTime.second)}.${parseInt(recordTime.millisecond.toString().substring(0, 1))}`;
    }

    showRankingTable();
}

if (progressBtn) progressBtn.addEventListener("click", showProgressScreen);

function exitProgressScreen() {
    quizProgress.style.display = "none";
    quizMenu.style.display = "block";
    resetInstructionBtn();
}

if (exitProgressBtn) exitProgressBtn.addEventListener("click", exitProgressScreen);

function resetProgress() {
    percentProgress.textContent = "Progresso atual: 0%";
    titleProgress.textContent = "Título: ???";
    rankProgress.textContent = "Rank: ???";
    resetProgressBtn.style.display = "none";
    recordTimeProgress.textContent = "Tempo decorrido: ???";
    milR = 0
    secR = 0;
    minR = 0;
    hR = 0;

    resetStar2Clicks();
    onePieceOp.pause();
    onePieceOp.currentTime = 0;

    startBtn.style.cursor = "pointer";
    startBtn.addEventListener("click", startQuiz);

    star1.style.display = "none";
    star2.style.display = "none";
    star3.style.display = "none";

    resetProgressBackground.style.cssText = "opacity: 0; visibility: hidden";

    sessionStorage.setItem("progress", 0);
    sessionStorage.setItem("fail", 0);
    sessionStorage.removeItem("recordScore");
    sessionStorage.removeItem("recordTime");
}

if (resetProgressBtn) resetProgressBtn.addEventListener("click", () => resetProgressBackground.style.cssText = "opacity: 1; visibility: visible;");
if (cancelResetProgressBtn) cancelResetProgressBtn.addEventListener("click", () => resetProgressBackground.style.cssText = "opacity: 0; visibility: hidden");
if (confirmResetProgressBtn) confirmResetProgressBtn.addEventListener("click", resetProgress);

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

if (star1) star1.addEventListener("dblclick", activateBonus);

function playMiniLuffyAudio() {
    miniLuffyAudio.volume = 0.3;
    miniLuffyAudio.currentTime = 0;
    miniLuffyAudio.play();
}

if (miniLuffy) miniLuffy.addEventListener("click", playMiniLuffyAudio);

function clickStar2() {
    clearTimeout(star2TimeoutHandle);
    clicks++;

    if (clicks == 1) {
        star2.setAttribute("data-before", "Não tem nada aqui.");
    } else if (clicks == 2) {
        star2.setAttribute("data-before", "Não insista.");
    } else if (clicks == 3) {
        star2.setAttribute("data-before", "Eu já falei...");
    } else if (clicks == 4) {
        star2.setAttribute("data-before", "Não vai acontecer nada.");
    } else if (clicks == 5) {
        star2.setAttribute("data-before", "Você não cansa não?");
    } else if (clicks == 6) {
        star2.setAttribute("data-before", "Acha que tem coisa escondida é?");
    } else if (clicks == 7) {
        star2.setAttribute("data-before", "Vai clicar até quando amigo?");
    } else if (clicks == 8) {
        star2.setAttribute("data-before", "Quanta curiosidade...");
    } else if (clicks == 9) {
        star2.setAttribute("data-before", "Você é insuportável!");
    } else if (clicks == 10) {
        star2.setAttribute("data-before", "Rapaz...");
    } else if (clicks == 11) {
        star2.setAttribute("data-before", "Não tem o que fazer não?");
    } else if (clicks == 12) {
        star2.setAttribute("data-before", "Você não leu o que eu te disse?");
    } else if (clicks == 13) {
        star2.setAttribute("data-before", "Totalmente questionável você chegar até aqui.");
    } else if (clicks == 14) {
        star2.setAttribute("data-before", "Tudo isso atrás de um segredo?");
    } else if (clicks == 15) {
        star2.setAttribute("data-before", "...");
    } else if (clicks == 16) {
        star2.setAttribute("data-before", '"NIKA"');

        document.addEventListener("keydown", (event) => {
            let key = event.key;
            let upperCaseKey = key.toUpperCase();

            if (upperCaseKey == "N" && secretWord == "") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey == "I" && secretWord.substring(0) == "N") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey == "K" && secretWord.substring(1) == "I") {
                secretWord += upperCaseKey;
            } else if (upperCaseKey == "A" && secretWord.substring(2) == "K") {
                secretWord += upperCaseKey;
            }

            if (secretWord == "NIKA") {
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

if (star2) star2.addEventListener("click", clickStar2);

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

if (star3) star3.addEventListener("click", clickStar3);

function showCreditsScreen() {
    quizMenu.style.display = "none";
    quizCredits.style.display = "flex";
}

if (creditsBtn) creditsBtn.addEventListener("click", showCreditsScreen);

function exitCreditsScreen() {
    quizMenu.style.display = "block";
    quizCredits.style.display = "none";
}

if (exitCreditsBtn) exitCreditsBtn.addEventListener("click", exitCreditsScreen);

document.addEventListener("contextmenu", event => event.preventDefault());