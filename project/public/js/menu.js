const background = document.querySelector(".background");

const gameMenuBtn = document.getElementById("gameMenuBtn");
const statisticsMenuBtn = document.getElementById("statisticsMenuBtn");

const settingsContainer = document.querySelector(".settings-container");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveEditionBtn = document.getElementById("saveEditionBtn");

const avatarContainer = document.querySelector(".avatar-container");
const avatarBtn = document.getElementById("avatarBtn");

const accountContainer = document.querySelector(".account-container");
const accountBtn = document.getElementById("accountBtn");

const securityContainer = document.querySelector(".security-container");
const securityBtn = document.getElementById("securityBtn");
const currentPassword = document.getElementById("currentPasswordInput");
const newPassword = document.getElementById("newPasswordInput");
const confirmNewPassword = document.getElementById("confirmNewPasswordInput");

const confirmLogoutModal = document.querySelector(".confirm-logout");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
const logoutBtn = document.getElementById("logoutBtn");

function openAvatarContainer() {
    avatarContainer.classList.add("active");
    accountContainer.classList.remove("active");
    securityContainer.classList.remove("active");
    saveEditionBtn.setAttribute("onclick", "saveAvatarEdition()");
    cleanSecurityInputs();
}

if (avatarBtn) avatarBtn.addEventListener("click", openAvatarContainer);

function openAccountContainer() {
    avatarContainer.classList.remove("active");
    accountContainer.classList.add("active");
    securityContainer.classList.remove("active");
    saveEditionBtn.setAttribute("onclick", "saveAccountEdition()");
    cleanSecurityInputs();
}

if (accountBtn) accountBtn.addEventListener("click", openAccountContainer);

function openSecurityContainer() {
    avatarContainer.classList.remove("active");
    accountContainer.classList.remove("active");
    securityContainer.classList.add("active");
    saveEditionBtn.setAttribute("onclick", "saveSecurityEdition()");
    currentPassword.focus();
}

if (securityBtn) securityBtn.addEventListener("click", openSecurityContainer);

function cleanSecurityInputs() {
    currentPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
}

function saveAvatarEdition() {
    closeSettingsContainer();
}

function saveAccountEdition() {
    closeSettingsContainer();
}

function saveSecurityEdition() {
    closeSettingsContainer();
}

function openSettingsContainer() {
    background.classList.add("active");
    settingsContainer.classList.add("active");
    openAvatarContainer();
}

if (settingsBtn) settingsBtn.addEventListener("click", openSettingsContainer);

function closeSettingsContainer() {
    background.classList.remove("active");
    settingsContainer.classList.remove("active");
}

if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", closeSettingsContainer);

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

gameMenuBtn.addEventListener("click", () => window.location.href = "../dashboard/game.html");
statisticsMenuBtn.addEventListener("click", () => window.location.href = "../dashboard/statistics.html");