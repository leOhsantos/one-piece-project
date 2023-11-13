const kpiSpeedrunTime = document.getElementById("kpiSpeedrunTime");
const kpi100 = document.getElementById("kpi100");
const kpiS = document.getElementById("kpiS");

const questionErrorTbody = document.getElementById("questionErrorTbody");

const pieChart = document.getElementById("pieChart");
let star1 = 0;
let star2 = 0;
let star3 = 0;
let star4 = 0;
let star5 = 0;

function twoDigits(question) {
    return question < 10 ? "0" + question : question;
}

function getKpisData() {
    fetch(`/score/count-score-100`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpi100.textContent = res[0].scoreCount;
                }
            });
        });

    fetch(`/score/count-speedrun-time`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpiSpeedrunTime.textContent = res[0].timeCount;
                }
            });
        });

    fetch(`/score/count-score-s`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpiS.textContent = res[0].scoreCount;
                }
            });
        });
}

function getRankingQuestionError() {
    fetch(`/question-error/list`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    for (let i = 0; i < 5; i++) {
                        questionErrorTbody.innerHTML += `
                        <tr>
                        <td>${i + 1}º</td>
                        <td>Questão ${twoDigits(res[i].questionNumber)}</td>
                        <td>${res[i].questionCount}x</td>
                        </tr>
                        `;
                    }
                }
            });
        });
}

function getFeedbackStarsCount() {
    fetch(`/feedback/list-by-stars/${1}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    star1 = Number(res[0].starsCount);
                }
            });
        });

    fetch(`/feedback/list-by-stars/${2}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    star2 = Number(res[0].starsCount);
                }
            });
        });

    fetch(`/feedback/list-by-stars/${3}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    star3 = Number(res[0].starsCount);
                }
            });
        });

    fetch(`/feedback/list-by-stars/${4}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    star4 = Number(res[0].starsCount);
                }
            });
        });

    fetch(`/feedback/list-by-stars/${5}`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    star5 = Number(res[0].starsCount);
                }
            });
        });
}

window.addEventListener("load", () => {
    getKpisData();
    getRankingQuestionError();
    getFeedbackStarsCount();
});

setTimeout(() => {
    Chart.defaults.color = "#ffffff";

    const data = {
        labels: [
            '1 ★',
            '2 ★',
            '3 ★',
            '4 ★',
            '5 ★'
        ],
        datasets: [{
            label: 'Estrelas',
            data: [star1, star2, star3, star4, star5],
            backgroundColor: [
                '#AE6427',
                '#303030',
                '#FFCC00',
                '#D70000',
                '#4B97D2'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    };

    new Chart(pieChart, config);
}, 100);

document.addEventListener("contextmenu", event => event.preventDefault());