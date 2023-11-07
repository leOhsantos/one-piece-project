const database = require("../database/config");

function listAllPlayers() {
    const instruction = `SELECT * FROM Player;`;
    return database.execute(instruction);
}

function listPlayer(idPlayer) {
    const instruction = `SELECT * FROM Player WHERE idPlayer = ${idPlayer};`;
    return database.execute(instruction);
}

function listPlayerByRank() {
    const instruction = `SELECT * FROM Player AS p JOIN Score AS s ON p.idPlayer = s.fkPlayer ORDER BY speedrunTime DESC;`;
    return database.execute(instruction);
}

function savePlayer(nickname, email, password) {
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
    listAllPlayers,
    listPlayer,
    listPlayerByRank,
    savePlayer,
    updateAvatar,
    updateNickname,
    updateTitle,
    updatePassword
};