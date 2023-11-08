const database = require("../database/config");

function list() {
    const instruction = `SELECT * FROM Score;`;
    return database.execute(instruction);
}

function save(rank, speedrunTime, idPlayer) {
    const instruction = `INSERT INTO Score (rank, speedrunTime, fkPlayer) VALUES ('${rank}', '${speedrunTime}', ${idPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    list,
    save
}