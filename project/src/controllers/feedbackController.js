const feedbackModel = require("../models/feedbackModel");

function listByStars(req, res) {
    let stars = req.params.stars;

    feedbackModel.listByStars(stars).then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function save(req, res) {
    let stars = req.body.stars;
    let idPlayer = req.params.idPlayer;

    feedbackModel.save(stars, idPlayer)
        .then(result => {
            res.status(201).json(result);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    listByStars,
    save
}