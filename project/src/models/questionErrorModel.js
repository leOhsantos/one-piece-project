const database = require("../database/config");

function listErrorsByQuestion(idPlayer) {
    const instruction = `SELECT COUNT(idQuestionError) AS Errors FROM QuestionError WHERE fkPlayer = ${idPlayer};`;
    return database.execute(instruction);
}

function saveQuestionError(questionNumber, idPlayer) {
    const instruction = `INSERT INTO QuestionError (questionNumber, fkPlayer) VALUES ('${questionNumber}', ${idPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    listErrorsByQuestion,
    saveQuestionError
}