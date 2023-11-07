const feedbackModel = require("../models/feedbackModel");

function listByStars(req, res) {
    let stars = req.params.stars;

    if (stars == undefined) {
        res.status(400).send("stars está indefinido!");
    } else {
        feedbackModel.listByStars(stars).then(function (result) {
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

function saveFeedback(req, res) {
    let stars = req.body.stars;
    let idPlayer = req.params.idPlayer;

    if (stars == undefined) {
        res.status(400).send("stars está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        feedbackModel.saveFeedback(stars, idPlayer)
            .then(result => {
                res.status(201).json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

module.exports = {
    listByStars,
    saveFeedback
}