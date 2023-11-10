const database = require("../database/config");

function list() {
    const instruction = `SELECT * FROM Score AS s JOIN Player AS p ON p.idPlayer = s.fkPlayer ORDER BY rankPlayer DESC, speedrunTime;`;
    return database.execute(instruction);
}

function listByPlayer(idPlayer) {
    const instruction = `SELECT * FROM Score AS s JOIN Player AS p ON p.idPlayer = s.fkPlayer WHERE fkPlayer = ${idPlayer}`;
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
    save,
    edit
}