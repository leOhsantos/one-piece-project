const background = document.querySelector(".background");
const gameMenuBtn = document.getElementById("gameMenuBtn");
const statisticsMenuBtn = document.getElementById("statisticsMenuBtn");

const settingsContainer = document.querySelector(".settings-container");
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

const confirmLogoutModal = document.querySelector(".confirm-logout");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
const logoutBtn = document.getElementById("logoutBtn");

const idPlayer = sessionStorage.getItem("idPlayer");

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
            }).catch(error => {
                console.log(error);
            });
    }
});

function openAvatarContainer() {
    avatarBtn.classList.add("active");
    accountBtn.classList.remove("active");
    securityBtn.classList.remove("active");

    avatarContainer.classList.add("active");
    accountContainer.classList.remove("active");
    securityContainer.classList.remove("active");

    settingsAvatar.src = menuAvatar.src;
    saveEditionBtn.setAttribute("onclick", "saveAvatarEdition()");
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

    fetch(`/player/update-avatar/${idPlayer}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: avatar
        })
    }).catch(error => {
        console.log(error);
    });

    menuAvatar.src = `../assets/image/${avatar}.jpg`;
    closeSettingsContainer();
}

function openAccountContainer() {
    avatarBtn.classList.remove("active");
    accountBtn.classList.add("active");
    securityBtn.classList.remove("active");

    avatarContainer.classList.remove("active");
    accountContainer.classList.add("active");
    securityContainer.classList.remove("active");

    titleSelect.value = menuTitle.textContent;
    saveEditionBtn.setAttribute("onclick", "saveAccountEdition()");
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
                console.error(text);
            });
        }
    }).catch(error => {
        console.log(error);
    });

    fetch(`/player/update-title/${idPlayer}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    }).catch(error => {
        console.log(error);
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
    if (newPasswordInput.value == confirmNewPasswordInput.value && newPasswordInput.value.length > 0) {
        fetch(`/player/update-password/${idPlayer}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: currentPasswordInput.value,
                newPassword: newPasswordInput.value
            })
        }).then(res => {
            if (res.status == 200) {
                closeSettingsContainer();
            } else {
                res.text().then(text => {
                    console.error(text);
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function openSettingsContainer() {
    background.classList.add("active");
    settingsContainer.classList.add("active");
    openAvatarContainer();
    disableEditNickname();
    setEyeIconToStandard();
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