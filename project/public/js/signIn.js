const form = document.getElementById("form");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");

const emailIcon = document.querySelector(".email-icon");
const passwordIcon = document.querySelector(".password-icon");
const eyeIcon = document.querySelector(".eye-icon");
const backArrow = document.querySelector(".back-arrow");

function signIn(email, password) {
    fetch("player/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => {
        if (res.status == 200) {
            res.json().then(res => {
                sessionStorage.setItem("idPlayer", res);
                window.location.href = "../dashboard/game.html";
            });
        } else {
            res.text().then(text => {
                console.error(text);
            });
        }
    }).catch(error => {
        console.log(error);
    });
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