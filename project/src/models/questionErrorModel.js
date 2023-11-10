const database = require("../database/config");

function listByQuestion(idPlayer) {
    const instruction = `SELECT COUNT(idQuestionError) AS Errors FROM QuestionError WHERE fkPlayer = ${idPlayer};`;
    return database.execute(instruction);
}

function save(questionNumber, idPlayer) {
    const instruction = `INSERT INTO QuestionError (questionNumber, fkPlayer) VALUES (${questionNumber}, ${idPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    listByQuestion,
    save
}