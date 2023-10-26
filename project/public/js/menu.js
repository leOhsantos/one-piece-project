const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");

function logoutUser() {
    window.location.href = "../index.html";
}

logoutBtn.addEventListener("click", logoutUser);