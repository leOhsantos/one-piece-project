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

const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".popup");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.querySelector(".popup-title");
const popupDescription = document.querySelector(".popup-description");
const closePopupBtn = document.getElementById("closePopupBtn");
let isPopupActive = false;

function navigateToSignInPage() {
    window.location.href = "../signin.html";
}

function openPopup(image, title, description, btnType, btnText, navigate) {
    popupBackground.classList.add("active");
    popup.classList.add("active");
    popupImg.src = `assets/image/${image}-icon.png`;
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    closePopupBtn.classList.add(btnType);
    closePopupBtn.textContent = btnText;

    isPopupActive = true;
    submitBtn.blur();

    if (navigate) {
        closePopupBtn.classList.remove("error");
        closePopupBtn.setAttribute("onclick", "navigateToSignInPage()");
    }
}

function signUp() {
    let nickname = nicknameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    fetch("/player/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: nickname,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    }).then(res => {
        if (res.status == 201) {
            openPopup("success", "Sucesso!", "Cadastro realizado com sucesso!", "success", "Continuar", true);
        } else {
            res.text().then(text => {
                openPopup("error", "Ooooops!", text, "error", "Tentar Novamente", false);
            });
        }
    });
}

submitBtn.addEventListener("click", signUp);

function enableSignUpButton() {
    let nickname = nicknameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    if (nickname != "" && email != "" && password != "" && confirmPassword != "") {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

nicknameInput.addEventListener("input", enableSignUpButton);
emailInput.addEventListener("input", enableSignUpButton);
passwordInput.addEventListener("input", enableSignUpButton);
confirmPasswordInput.addEventListener("input", enableSignUpButton);

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