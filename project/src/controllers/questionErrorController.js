const questionErrorModel = require("../models/questionErrorModel");

function listByQuestion(req, res) {
    let idPlayer = req.params.idPlayer;

    if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        questionErrorModel.listByQuestion(idPlayer).then(function (result) {
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

function save(req, res) {
    let questionNumber = req.body.questionNumber;
    let idPlayer = req.params.idPlayer;

    if (questionNumber == undefined) {
        res.status(400).send("questionNumber está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        questionErrorModel.save(questionNumber, idPlayer)
            .then(result => {
                res.status(201).json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

module.exports = {
    listByQuestion,
    save
}