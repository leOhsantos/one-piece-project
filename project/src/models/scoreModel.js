const database = require("../database/config");

function list() {
    const instruction = `SELECT * FROM Score AS s JOIN Player AS p ON p.idPlayer = s.fkPlayer ORDER BY rankPlayer DESC, speedrunTime;`;
    return database.execute(instruction);
}

function listByPlayer(idPlayer) {
    const instruction = `SELECT * FROM Score AS s JOIN Player AS p ON p.idPlayer = s.fkPlayer WHERE fkPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

function countScore100() {
    const instruction = `SELECT COUNT(idScore) AS scoreCount FROM Score WHERE rankPlayer = 2 OR rankPlayer = 4 OR rankPlayer = 6 OR rankPlayer = 7;`;
    return database.execute(instruction);
}

function countSpeedrunTime() {
    const instruction = `SELECT COUNT(idScore) AS timeCount FROM Score WHERE speedrunTime <= '00:01:00.0';`;
    return database.execute(instruction);
}

function countScoreS() {
    const instruction = `SELECT COUNT(idScore) AS scoreCount FROM Score WHERE rankPlayer = 7;`;
    return database.execute(instruction);
}

function save(rank, speedrunTime, idPlayer) {
    const instruction = `INSERT INTO Score (rankPlayer, speedrunTime, fkPlayer) VALUES (${rank}, '${speedrunTime}', ${idPlayer});`;
    return database.execute(instruction);
}

function edit(rank, speedrunTime, idPlayer) {
    const instruction = `UPDATE Score SET rankPlayer = ${rank}, speedrunTime = '${speedrunTime}' WHERE fkPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

module.exports = {
    list,
    listByPlayer,
    countScore100,
    countSpeedrunTime,
    countScoreS,
    save,
    edit
}