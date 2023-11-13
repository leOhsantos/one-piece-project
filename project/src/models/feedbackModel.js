const database = require("../database/config");

function listByStars(stars) {
    const instruction = `SELECT COUNT(idFeedback) AS starsCount FROM Feedback WHERE stars = ${stars};`;
    return database.execute(instruction);
}

function listByPlayer(idPlayer) {
    const instruction = `SELECT * FROM Feedback WHERE fkPlayer = ${idPlayer};`;
    return database.execute(instruction);
}

function save(stars, idPlayer) {
    const instruction = `INSERT INTO Feedback (stars, fkPlayer) VALUES (${stars}, ${idPlayer});`;
    return database.execute(instruction);
}

function deleteFeedback(idPlayer) {
    const instruction = `DELETE FROM Feedback WHERE fkPlayer = ${idPlayer}`;
    return database.execute(instruction);
}

module.exports = {
    listByStars,
    listByPlayer,
    save,
    deleteFeedback
}