const questionErrorModel = require("../models/questionErrorModel");

function listByQuestion(req, res) {
    let idPlayer = req.params.idPlayer;

    questionErrorModel.listByQuestion(idPlayer).then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function save(req, res) {
    let questionNumber = req.body.questionNumber;
    let idPlayer = req.params.idPlayer;

    questionErrorModel.save(questionNumber, idPlayer)
        .then(result => {
            res.status(201).json(result);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    listByQuestion,
    save
}