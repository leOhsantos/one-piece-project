const database = require("../database/config");

function list() {
    const instruction = `SELECT COUNT(idQuestionError) AS questionCount, questionNumber FROM QuestionError GROUP BY questionNumber ORDER BY questionCount DESC LIMIT 5;`;
    return database.execute(instruction);
}

function save(questionNumber, idPlayer) {
    const instruction = `INSERT INTO QuestionError (questionNumber, fkPlayer) VALUES (${questionNumber}, ${idPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    list,
    save
}