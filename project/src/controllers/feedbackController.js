const feedbackModel = require("../models/feedbackModel");

function listByStars(req, res) {
    feedbackModel.listByStars()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function listByPlayer(req, res) {
    let idPlayer = req.params.idPlayer;

    feedbackModel.listByPlayer(idPlayer)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function save(req, res) {
    let stars = req.body.stars;
    let idPlayer = req.params.idPlayer;

    feedbackModel.save(stars, idPlayer)
        .then(result => {
            res.status(201).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function deleteFeedback(req, res) {
    let idPlayer = req.params.idPlayer;

    feedbackModel.deleteFeedback(idPlayer)
        .then(result => {
            res.status(201).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    listByStars,
    listByPlayer,
    save,
    deleteFeedback
}