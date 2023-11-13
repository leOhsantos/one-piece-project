const scoreModel = require("../models/scoreModel");

function list(req, res) {
    scoreModel.list().then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function listByPlayer(req, res) {
    let idPlayer = req.params.idPlayer;

    scoreModel.listByPlayer(idPlayer).then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function countScore100(req, res) {
    scoreModel.countScore100().then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function countSpeedrunTime(req, res) {
    scoreModel.countSpeedrunTime().then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function countScoreS(req, res) {
    scoreModel.countScoreS().then(function (result) {
        res.status(200).json(result);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function save(req, res) {
    let rank = req.body.rank;
    let speedrunTime = req.body.speedrunTime;
    let idPlayer = req.params.idPlayer;

    scoreModel.listByPlayer(idPlayer)
        .then(playerRes => {
            if (playerRes.length > 0) {
                if (rank >= playerRes[0].rankPlayer && speedrunTime <= playerRes[0].speedrunTime || playerRes[0].speedrunTime == "00:00:00.0") {
                    scoreModel.edit(rank, speedrunTime, idPlayer)
                        .then(result => {
                            res.status(201).json(result);
                        });
                }
            } else {
                scoreModel.save(rank, speedrunTime, idPlayer)
                    .then(result => {
                        res.status(201).json(result);
                    });
            }
        });
}

module.exports = {
    list,
    listByPlayer,
    countScore100,
    countSpeedrunTime,
    countScoreS,
    save
}