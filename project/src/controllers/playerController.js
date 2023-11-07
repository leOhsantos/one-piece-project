const playerModel = require("../models/playerModel");

function listAllPlayers(req, res) {
    playerModel.listAllPlayers().then(function (result) {
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

function listPlayer(req, res) {
    let idPlayer = req.params.idPlayer;

    if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.listPlayer(idPlayer).then(function (result) {
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

function listPlayerByRank(req, res) {
    playerModel.listPlayerByRank().then(function (result) {
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


function savePlayer(req, res) {
    let nickname = req.body.nickname;
    let email = req.body.email;
    let password = req.body.password;

    if (nickname == undefined) {
        res.status(400).send("nickname está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("email está indefinido!");
    } else if (password == undefined) {
        res.status(400).send("password está indefinido!");
    } else {
        playerModel.savePlayer(nickname, email, password)
            .then(result => {
                res.status(201).json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

function updateAvatar(req, res) {
    let avatar = req.body.avatar;
    let idPlayer = req.body.idPlayer;

    if (avatar == undefined) {
        res.status(400).send("avatar está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.updateAvatar(avatar, idPlayer)
            .then(result => {
                res.json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

function updateTitle(req, res) {
    let title = req.body.avatar;
    let idPlayer = req.body.idPlayer;

    if (title == undefined) {
        res.status(400).send("title está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.updateTitle(title, idPlayer)
            .then(result => {
                res.json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

function updatePassword(req, res) {
    let password = req.body.avatar;
    let idPlayer = req.body.idPlayer;

    if (password == undefined) {
        res.status(400).send("password está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.updatePassword(password, idPlayer)
            .then(result => {
                res.json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

module.exports = {
    listAllPlayers,
    listPlayer,
    listPlayerByRank,
    savePlayer,
    updateAvatar,
    updateTitle,
    updatePassword
}