const form = document.getElementById("form");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");

const emailIcon = document.querySelector(".email-icon");
const passwordIcon = document.querySelector(".password-icon");
const eyeIcon = document.querySelector(".eye-icon");
const backArrow = document.querySelector(".back-arrow");

let players = [];

window.addEventListener("load", () => {
    fetch("player/list-all-players")
        .then(res => {
            if (res.status == 200) {
                res.json().then(res => {
                    players = res;
                });
            }
        }).catch(error => {
            console.log(error);
        });
});

function signIn(email, password) {
    let playerNotFound = false;

    for (let i = 0; i < players.length; i++) {
        if (email == players[i].email && password == players[i].password) {
            sessionStorage.setItem("idPlayer", players[i].idPlayer);
            window.location.href = "../dashboard/game.html";
            playerNotFound = false;
            break;
        } else {
            playerNotFound = true;
        }
    }

    if (playerNotFound) {
        alert("E-mail ou senha incorretos!");
    }
}

function checkInput() {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    let email = emailInput.value;
    let password = passwordInput.value;

    let emailTest = emailRegex.test(email);

    if (!emailTest) {
        emailIcon.classList.add("error");
        emailInput.classList.add("error");
    }

    if (password == "") {
        passwordIcon.classList.add("error");
        passwordInput.classList.add("error");
    }

    if (emailTest && password != "") {
        signIn(email, password);
    }
}

submitBtn.addEventListener("click", checkInput);

function removeInputError() {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    let email = emailInput.value;
    let password = passwordInput.value;

    let emailTest = emailRegex.test(email);

    if (emailTest) {
        emailIcon.classList.remove("error");
        emailInput.classList.remove("error");
    }

    if (password != "") {
        passwordIcon.classList.remove("error");
        passwordInput.classList.remove("error");
    }
}

emailInput.addEventListener("input", removeInputError);
passwordInput.addEventListener("input", removeInputError);

function toggleEyePassword() {
    if (passwordInput.type == "password") {
        passwordInput.setAttribute("type", "text");
        eyeIcon.src = "assets/svg/visible-password-icon.svg";
    } else {
        passwordInput.setAttribute("type", "password");
        eyeIcon.src = "assets/svg/invisible-password-icon.svg";
    }
}

eyeIcon.addEventListener("click", toggleEyePassword);

form.addEventListener("submit", (e) => e.preventDefault());
backArrow.addEventListener("click", () => window.history.back());