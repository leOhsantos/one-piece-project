const database = require("../database/config");

function list() {
    const instruction = `SELECT * FROM Score;`;
    return database.execute(instruction);
}

function saveScore(rank, speedrunTime, fkPlayer) {
    const instruction = `INSERT INTO Score (rank, speedrunTime, fkPlayer) VALUES ('${rank}', '${speedrunTime}', ${fkPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    list,
    saveScore
}