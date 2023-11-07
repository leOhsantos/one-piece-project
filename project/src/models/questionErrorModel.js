const database = require("../database/config");

function listErrorsByQuestion(fkPlayer) {
    const instruction = `SELECT COUNT(idQuestionError) AS Errors FROM QuestionError WHERE fkPlayer = ${fkPlayer};`;
    return database.execute(instruction);
}

function saveQuestionError(questionNumber, fkPlayer) {
    const instruction = `INSERT INTO QuestionError (questionNumber, fkPlayer) VALUES ('${questionNumber}', ${fkPlayer});`;
    return database.execute(instruction);
}

module.exports = {
    listErrorsByQuestion,
    saveQuestionError
}