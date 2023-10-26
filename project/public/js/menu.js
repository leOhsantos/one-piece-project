const background = document.querySelector(".background");
const confirmLogoutModal = document.querySelector(".confirm-logout");
const settingsBtn = document.getElementById("settingsBtn");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
const logoutBtn = document.getElementById("logoutBtn");

function openConfirmLogoutModal() {
    background.classList.add("active");
    confirmLogoutModal.classList.add("active");
}

confirmLogoutBtn.addEventListener("click", openConfirmLogoutModal);

function closeConfirmLogoutModal() {
    background.classList.remove("active");
    confirmLogoutModal.classList.remove("active");
}

cancelLogoutBtn.addEventListener("click", closeConfirmLogoutModal);

function logoutUser() {
    window.location.href = "../index.html";
}

logoutBtn.addEventListener("click", logoutUser);