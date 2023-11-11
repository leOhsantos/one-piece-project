const background = document.querySelector(".background");
const gameMenuBtn = document.getElementById("gameMenuBtn");
const statisticsMenuBtn = document.getElementById("statisticsMenuBtn");

const settingsContainer = document.querySelector(".settings-container");
const avatar = document.querySelector(".avatar");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveEditionBtn = document.getElementById("saveEditionBtn");

const avatarContainer = document.querySelector(".avatar-container");
const menuAvatar = document.getElementById("menuAvatar");
const avatarBtn = document.getElementById("avatarBtn");
const settingsAvatar = document.getElementById("settingsAvatar");

const accountContainer = document.querySelector(".account-container");
const menuNickname = document.getElementById("menuNickname");
const menuTitle = document.getElementById("menuTitle");
const accountBtn = document.getElementById("accountBtn");
const emailInput = document.getElementById("emailInput");
const nicknameInput = document.getElementById("nicknameInput");
const editBtn = document.getElementById("editBtn");
const titleSelect = document.getElementById("titleSelect");

const securityContainer = document.querySelector(".security-container");
const securityBtn = document.getElementById("securityBtn");
const currentPasswordInput = document.getElementById("currentPasswordInput");
const newPasswordInput = document.getElementById("newPasswordInput");
const confirmNewPasswordInput = document.getElementById("confirmNewPasswordInput");
const currentPasswordEyeIcon = document.getElementById("currentPasswordEyeIcon");
const eyeIcon = document.querySelectorAll(".eye-icon");

const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".popup");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.querySelector(".popup-title");
const popupDescription = document.querySelector(".popup-description");
const closePopupBtn = document.getElementById("closePopupBtn");

const confirmLogoutModal = document.querySelector(".confirm-logout");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
const logoutBtn = document.getElementById("logoutBtn");

const idPlayer = sessionStorage.getItem("idPlayer");
let playerList = [];
let rankingList = [];

window.addEventListener("load", () => {
    if (!idPlayer) {
        window.location.href = "../index.html";
    } else {
        fetch(`/player/list/${idPlayer}`)
            .then(res => {
                res.json().then(res => {
                    emailInput.value = res[0].email;
                    menuAvatar.src = `../assets/image/${res[0].avatar}.jpg`;
                    menuNickname.textContent = res[0].nickname;
                    menuTitle.textContent = res[0].title;
                });
            });
    }

    getScore();
});

function getScore() {
    fetch(`/score/list-by-player/${idPlayer}`)
        .then(res => {
            res.json().then(res => {
                playerList = res[0];
            });
        });

    fetch(`/score/list`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    rankingList = res;
                }
            });
        });
}

function showTitles() {
    if (!playerList) {
        titleSelect.innerHTML = `
        <option value="Figurante">Figurante</option>
        `;
    } else {
        if (playerList.rankPlayer <= 2) {
            titleSelect.innerHTML = `
        <option value="Figurante">Figurante</option>
        <option value="Pirata Comum">Pirata Comum</option>
        `;
        } else if (playerList.rankPlayer <= 4) {
            titleSelect.innerHTML = `
        <option value="Figurante">Figurante</option>
        <option value="Pirata Comum">Pirata Comum</option>
        <option value="Supernova">Supernova</option>
        `;
        } else if (playerList.rankPlayer <= 6) {
            titleSelect.innerHTML = `
        <option value="Figurante">Figurante</option>
        <option value="Pirata Comum">Pirata Comum</option>
        <option value="Supernova">Supernova</option>
        <option value="Yonkou">Yonkou</option>
        `;
        } else {
            titleSelect.innerHTML = `
        <option value="Figurante">Figurante</option>
        <option value="Pirata Comum">Pirata Comum</option>
        <option value="Supernova">Supernova</option>
        <option value="Yonkou">Yonkou</option>
        <option value="Rei dos Piratas">Rei dos Piratas</option>
        `;
        }
    }
}

function openAvatarContainer() {
    avatarBtn.classList.add("active");
    accountBtn.classList.remove("active");
    securityBtn.classList.remove("active");

    avatarContainer.classList.add("active");
    accountContainer.classList.remove("active");
    securityContainer.classList.remove("active");

    settingsAvatar.src = menuAvatar.src;
    saveEditionBtn.setAttribute("onclick", "saveAvatarEdition()");
    saveEditionBtn.textContent = "Alterar avatar";
    cleanSecurityInputs();
}

if (avatarBtn) avatarBtn.addEventListener("click", openAvatarContainer);

function setAvatar(e) {
    let avatar = e.getAttribute("data-avatar");
    settingsAvatar.setAttribute("data-avatar", avatar);
    settingsAvatar.src = `../assets/image/${avatar}.jpg`;
}

function saveAvatarEdition() {
    let avatar = settingsAvatar.getAttribute("data-avatar");

    if (avatar) {
        fetch(`/player/update-avatar/${idPlayer}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: avatar
            })
        });

        menuAvatar.src = `../assets/image/${avatar}.jpg`;
        closeSettingsContainer();
    }
}

function openAccountContainer() {
    avatarBtn.classList.remove("active");
    accountBtn.classList.add("active");
    securityBtn.classList.remove("active");

    avatarContainer.classList.remove("active");
    accountContainer.classList.add("active");
    securityContainer.classList.remove("active");

    showTitles();
    titleSelect.value = menuTitle.textContent;

    saveEditionBtn.setAttribute("onclick", "saveAccountEdition()");
    saveEditionBtn.textContent = "Atualizar conta";
    cleanSecurityInputs();
}

if (accountBtn) accountBtn.addEventListener("click", openAccountContainer);

function enableEditNickname() {
    nicknameInput.removeAttribute("disabled");
    nicknameInput.classList.remove("disabled");
    nicknameInput.focus();
}

if (editBtn) editBtn.addEventListener("click", enableEditNickname);

function disableEditNickname() {
    nicknameInput.setAttribute("disabled", true);
    nicknameInput.classList.add("disabled");
    nicknameInput.value = menuNickname.textContent;
}

function saveAccountEdition() {
    let nickname = nicknameInput.value;
    let title = titleSelect.value;

    fetch(`/player/update-nickname/${idPlayer}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: nickname
        })
    }).then(res => {
        if (res.status == 200) {
            menuNickname.textContent = nickname;
            closeSettingsContainer();
        } else {
            res.text().then(text => {
                openPopup("error", "Ooooops!", text, "error", "Tentar Novamente", false);
            });
        }
    });

    fetch(`/player/update-title/${idPlayer}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    menuTitle.textContent = title;
}

function openSecurityContainer() {
    avatarBtn.classList.remove("active");
    accountBtn.classList.remove("active");
    securityBtn.classList.add("active");

    avatarContainer.classList.remove("active");
    accountContainer.classList.remove("active");
    securityContainer.classList.add("active");

    saveEditionBtn.setAttribute("onclick", "saveSecurityEdition()");
    saveEditionBtn.textContent = "Alterar senha";
    currentPasswordInput.focus();
}

if (securityBtn) securityBtn.addEventListener("click", openSecurityContainer);

function cleanSecurityInputs() {
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmNewPasswordInput.value = "";
}

function toggleCurrentPasswordIcon() {
    if (currentPasswordInput.type == "password") {
        currentPasswordInput.setAttribute("type", "text");
        currentPasswordEyeIcon.src = "../assets/svg/visible-password-icon.svg";
    } else {
        currentPasswordInput.setAttribute("type", "password");
        currentPasswordEyeIcon.src = "../assets/svg/invisible-password-icon.svg";
    }
}

if (currentPasswordEyeIcon) currentPasswordEyeIcon.addEventListener("click", toggleCurrentPasswordIcon);

function toggleEyeIcon() {
    if (newPasswordInput.type == "password") {
        newPasswordInput.setAttribute("type", "text");
        confirmNewPasswordInput.setAttribute("type", "text");
        eyeIcon.forEach((e) => e.src = "../assets/svg/visible-password-icon.svg");
    } else {
        newPasswordInput.setAttribute("type", "password");
        confirmNewPasswordInput.setAttribute("type", "password");
        eyeIcon.forEach((e) => e.src = "../assets/svg/invisible-password-icon.svg");
    }
}

if (eyeIcon) eyeIcon.forEach((e) => e.addEventListener("click", toggleEyeIcon));

function setEyeIconToStandard() {
    currentPasswordInput.setAttribute("type", "password");
    newPasswordInput.setAttribute("type", "password");
    confirmNewPasswordInput.setAttribute("type", "password");
    currentPasswordEyeIcon.src = "../assets/svg/invisible-password-icon.svg";
    eyeIcon.forEach((e) => e.src = "../assets/svg/invisible-password-icon.svg");
}

function saveSecurityEdition() {
    fetch(`/player/update-password/${idPlayer}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: currentPasswordInput.value,
            newPassword: newPasswordInput.value,
            confirmNewPassword: confirmNewPasswordInput.value
        })
    }).then(res => {
        if (res.status == 200) {
            openPopup("success", "Sucesso!", "Senha alterada com sucesso!", "success", "Continuar", true);
        } else {
            res.text().then(text => {
                openPopup("error", "Ooooops!", text, "error", "Tentar Novamente", false);
            });
        }
    });
}

function openSettingsContainer() {
    background.classList.add("active");
    settingsContainer.classList.add("active");
    openAvatarContainer();
    disableEditNickname();
    setEyeIconToStandard();
}

if (settingsBtn) {
    settingsBtn.addEventListener("click", openSettingsContainer);
    avatar.addEventListener("click", openSettingsContainer);
}

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

function openPopup(image, title, description, btnType, btnText, isPasswordUpdated) {
    popupBackground.classList.add("active");
    popup.classList.add("active");
    popupImg.src = `../assets/image/${image}-icon.png`;
    popupTitle.textContent = title;
    popupDescription.textContent = description;
    closePopupBtn.classList.add(btnType);
    closePopupBtn.textContent = btnText;

    if (isPasswordUpdated) {
        closePopupBtn.classList.remove("error");
        closePopupBtn.setAttribute("onclick", "closeAllModals()");
    }
}

function closePopup() {
    popupBackground.classList.remove("active");
    popup.classList.remove("active");
    closePopupBtn.setAttribute("onclick", "closePopup()");
}

function closeAllModals() {
    closePopup();
    closeSettingsContainer();
}

function logoutUser() {
    sessionStorage.removeItem("idPlayer");
    sessionStorage.removeItem("fail");
    sessionStorage.removeItem("currentScore");
    sessionStorage.removeItem("recordScore");
    sessionStorage.removeItem("recordTime");
    sessionStorage.removeItem("progress");
    sessionStorage.removeItem("bonus");
    window.location.href = "../index.html";
}

logoutBtn.addEventListener("click", logoutUser);

gameMenuBtn.addEventListener("click", () => window.location.href = "../dashboard/game.html");
statisticsMenuBtn.addEventListener("click", () => window.location.href = "../dashboard/statistics.html");