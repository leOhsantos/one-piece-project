const database = require("../database/config");

function listAll() {
    const instruction = `SELECT * FROM Player;`;
    return database.execute(instruction);
}

function list(idPlayer) {
    const instruction = `SELECT * FROM Player WHERE idPlayer = ${idPlayer};`;
    return database.execute(instruction);
}

function authenticate(email, password) {
    const instruction = `SELECT * FROM Player WHERE email = '${email}' AND password = '${password}'`;
    return database.execute(instruction);
}

function save(nickname, email, password) {
    const instruction = `INSERT INTO Player (nickname, email, password) VALUES ('${nickname}', '${email}', '${password}');`;
    return database.execute(instruction);
}

function updateAvatar(avatar, idPlayer) {
    const instruction = `UPDATE Player SET avatar = '${avatar}' WHERE idPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

function updateNickname(nickname, idPlayer) {
    const instruction = `UPDATE Player SET nickname = '${nickname}' WHERE idPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

function updateTitle(title, idPlayer) {
    const instruction = `UPDATE Player SET title = '${title}' WHERE idPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

function updatePassword(password, idPlayer) {
    const instruction = `UPDATE Player SET password = '${password}' WHERE idPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

module.exports = {
    listAll,
    list,
    authenticate,
    save,
    updateAvatar,
    updateNickname,
    updateTitle,
    updatePassword
};