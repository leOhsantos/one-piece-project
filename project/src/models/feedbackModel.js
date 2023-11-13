const database = require("../database/config");

function listByStars() {
    const instruction = `SELECT COUNT(idFeedback) AS star5, 
        (SELECT COUNT(idFeedback) FROM Feedback WHERE stars = 4) AS star4, 
        (SELECT COUNT(idFeedback) FROM Feedback WHERE stars = 3) AS star3, 
        (SELECT COUNT(idFeedback) FROM Feedback WHERE stars = 2) AS star2, 
        (SELECT COUNT(idFeedback) FROM Feedback WHERE stars = 1) AS star1 
        FROM Feedback WHERE stars = 5;`;
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