const questionErrorModel = require("../models/questionErrorModel");

function list(req, res) {
    questionErrorModel.list()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function save(req, res) {
    let questionNumber = req.body.questionNumber;
    let idPlayer = req.params.idPlayer;

    questionErrorModel.save(questionNumber, idPlayer)
        .then(result => {
            res.status(201).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    list,
    save
}