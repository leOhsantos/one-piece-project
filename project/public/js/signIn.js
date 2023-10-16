const form = document.getElementById("form");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const eyeIcon = document.querySelector(".eye-icon");
const submitBtn = document.getElementById("submitBtn");

function toggleEyePassword() {
    if (passwordInput.type == "password") {
        passwordInput.setAttribute("type", "text");
        eyeIcon.src = "assets/svg/visible-password-icon.svg";
    } else {
        passwordInput.setAttribute("type", "password");
        eyeIcon.src = "assets/svg/invisible-password-icon.svg";
    }
}

form.addEventListener("submit", (e) => e.preventDefault());
eyeIcon.addEventListener("click", toggleEyePassword);