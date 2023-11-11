const form = document.getElementById("form");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");

const emailIcon = document.querySelector(".email-icon");
const passwordIcon = document.querySelector(".password-icon");
const eyeIcon = document.querySelector(".eye-icon");
const backArrow = document.querySelector(".back-arrow");

const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".popup");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.querySelector(".popup-title");
const popupDescription = document.querySelector(".popup-description");
const closePopupBtn = document.getElementById("closePopupBtn");

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
                openPopup("error", "Ooooops!", text, "error", "Tentar Novamente");
            });
        }
    });
}

function checkInput() {
    let email = emailInput.value;
    let password = passwordInput.value;
    signIn(email, password);
}

submitBtn.addEventListener("click", checkInput);

function enableSignInButton() {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    let email = emailInput.value;
    let password = passwordInput.value;

    let emailTest = emailRegex.test(email);

    if (emailTest && password != "") {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

emailInput.addEventListener("input", enableSignInButton);
passwordInput.addEventListener("input", enableSignInButton);

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

function openPopup(image, title, description, btnType, btnText) {
    popupBackground.classList.add("active");
    popup.classList.add("active");
    popupImg.src = `assets/image/${image}-icon.png`;
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    closePopupBtn.classList.add(btnType);
    closePopupBtn.textContent = btnText;
}

function closePopup() {
    popupBackground.classList.remove("active");
    popup.classList.remove("active");
}

form.addEventListener("submit", (e) => e.preventDefault());
backArrow.addEventListener("click", () => window.history.back());