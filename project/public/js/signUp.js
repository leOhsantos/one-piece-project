const form = document.getElementById("form");
const nicknameInput = document.getElementById("nicknameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const submitBtn = document.getElementById("submitBtn");

const nicknameIcon = document.querySelector(".nickname-icon");
const emailIcon = document.querySelector(".email-icon");
const passwordIcon = document.querySelector(".password-icon");
const confirmPasswordIcon = document.querySelector(".confirm-password-icon");
const eyeIcon = document.querySelectorAll(".eye-icon");
const backArrow = document.querySelector(".back-arrow");

function signUp(nickname, email, password) {
    fetch("/player/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: nickname,
            email: email,
            password: password
        })
    }).then(res => {
        if (res.status == 201) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../signin.html";
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

    let nickname = nicknameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    let emailTest = emailRegex.test(email);

    if (nickname == "") {
        nicknameIcon.classList.add("error");
        nicknameInput.classList.add("error");
    }

    if (!emailTest) {
        emailIcon.classList.add("error");
        emailInput.classList.add("error");
    }

    if (password == "") {
        passwordIcon.classList.add("error");
        passwordInput.classList.add("error");
    }

    if (confirmPassword != password || confirmPassword == "") {
        confirmPasswordIcon.classList.add("error");
        confirmPasswordInput.classList.add("error");
    }

    if (nickname != "" && emailTest && password == confirmPassword && password != "" && confirmPassword != "") {
        signUp(nickname, email, password);
    }
}

submitBtn.addEventListener("click", checkInput);

function removeInputError() {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    let nickname = nicknameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    let emailTest = emailRegex.test(email);

    if (nickname != "") {
        nicknameIcon.classList.remove("error");
        nicknameInput.classList.remove("error");
    }

    if (emailTest) {
        emailIcon.classList.remove("error");
        emailInput.classList.remove("error");
    }

    if (password != "") {
        passwordIcon.classList.remove("error");
        passwordInput.classList.remove("error");
    }

    if (confirmPassword == password && confirmPassword.length >= 1) {
        confirmPasswordIcon.classList.remove("error");
        confirmPasswordInput.classList.remove("error");
    }
}

nicknameInput.addEventListener("input", removeInputError);
emailInput.addEventListener("input", removeInputError);
passwordInput.addEventListener("input", removeInputError);
confirmPasswordInput.addEventListener("input", removeInputError);

function toggleEyePassword() {
    if (passwordInput.type == "password") {
        passwordInput.setAttribute("type", "text");
        confirmPasswordInput.setAttribute("type", "text");
        eyeIcon.forEach((e) => e.src = "assets/svg/visible-password-icon.svg");
    } else {
        passwordInput.setAttribute("type", "password");
        confirmPasswordInput.setAttribute("type", "password");
        eyeIcon.forEach((e) => e.src = "assets/svg/invisible-password-icon.svg");
    }
}

eyeIcon.forEach((e) => e.addEventListener("click", toggleEyePassword));

form.addEventListener("submit", (e) => e.preventDefault());
backArrow.addEventListener("click", () => window.history.back());