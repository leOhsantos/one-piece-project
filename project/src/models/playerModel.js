const database = require("../database/config");

function listAllPlayers() {
    const instruction = `SELECT * FROM Player;`;
    return database.execute(instruction);
}

function listPlayer(fkPlayer) {
    const instruction = `SELECT * FROM Player WHERE idPlayer = ${fkPlayer};`;
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

function updateAvatar(avatar, fkPlayer) {
    const instruction = `UPDATE Player SET avatar = '${avatar}' WHERE fkPlayer = ${fkPlayer}`;
    return database.execute(instruction);
}

function updateTitle(title, fkPlayer) {
    const instruction = `UPDATE Player SET title = '${title}' WHERE fkPlayer = ${fkPlayer}`;
    return database.execute(instruction);
}

function updatePassword(password, fkPlayer) {
    const instruction = `UPDATE Player SET password = '${password}' WHERE fkPlayer = ${fkPlayer}`;
    return database.execute(instruction);
}

module.exports = {
    listAllPlayers,
    listPlayer,
    listPlayerByRank,
    savePlayer,
    updateAvatar,
    updateTitle,
    updatePassword
};