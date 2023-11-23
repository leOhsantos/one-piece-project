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
let isPopupActive = false;

const loadingBackground = document.querySelector(".loading-background");

function showLoadingScreen() {
    loadingBackground.classList.add("active");

    setTimeout(() => {
        loadingBackground.classList.remove("active");
        window.location.href = "../dashboard/game.html";
    }, 1500);
}

function openPopup(image, title, description, btnType, btnText) {
    popupBackground.classList.add("active");
    popup.classList.add("active");
    popupImg.src = `assets/image/${image}-icon.png`;
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    closePopupBtn.classList.add(btnType);
    closePopupBtn.textContent = btnText;

    isPopupActive = true;
    submitBtn.blur();
}

function signIn() {
    let email = emailInput.value;
    let password = passwordInput.value;

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
                showLoadingScreen();
            });
        } else {
            res.text().then(text => {
                openPopup("error", "Ooooops!", text, "error", "Tentar Novamente");
            });
        }
    });
}

submitBtn.addEventListener("click", signIn);

function enableSignInButton() {
    let email = emailInput.value;
    let password = passwordInput.value;

    if (email != "" && password != "") {
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

function closePopup() {
    popupBackground.classList.remove("active");
    popup.classList.remove("active");
    isPopupActive = false;
}

function clickByEnter(e) {
    if (e.key == "Enter") {
        if (isPopupActive) {
            closePopupBtn.click();
        } else {
            if (document.activeElement != submitBtn) {
                submitBtn.click();
            }
        }
    }
}

document.addEventListener("keypress", clickByEnter);
backArrow.addEventListener("click", () => window.history.back());