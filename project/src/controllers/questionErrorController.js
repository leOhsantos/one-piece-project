const questionErrorModel = require("../models/questionErrorModel");

function listErrorsByQuestion(req, res) {
    let idPlayer = req.params.idPlayer;

    if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        questionErrorModel.listErrorsByQuestion(idPlayer).then(function (result) {
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
    }
}

function saveQuestionError(req, res) {
    let questionNumber = req.body.questionNumber;
    let idPlayer = req.body.idPlayer;

    if (questionNumber == undefined) {
        res.status(400).send("questionNumber está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        questionErrorModel.saveQuestionError(questionNumber, idPlayer)
            .then(result => {
                res.status(201).json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

module.exports = {
    listErrorsByQuestion,
    saveQuestionError
}