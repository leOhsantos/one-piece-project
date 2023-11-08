const playerModel = require("../models/playerModel");

function listAll(req, res) {
    playerModel.listAll().then(function (result) {
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

function list(req, res) {
    let idPlayer = req.params.idPlayer;

    if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.list(idPlayer).then(function (result) {
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

function listByRank(req, res) {
    playerModel.listByRank().then(function (result) {
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


function save(req, res) {
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
        playerModel.save(nickname, email, password)
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
    let idPlayer = req.params.idPlayer;

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

function updateNickname(req, res) {
    let nickname = req.body.nickname;
    let idPlayer = req.params.idPlayer;

    if (nickname == undefined) {
        res.status(400).send("nickname está indefinido!");
    } else if (idPlayer == undefined) {
        res.status(400).send("idPlayer está indefinido!");
    } else {
        playerModel.updateNickname(nickname, idPlayer)
            .then(result => {
                res.json(result);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error.sqlMessage);
            });
    }
}

function updateTitle(req, res) {
    let title = req.body.title;
    let idPlayer = req.params.idPlayer;

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
    let idPlayer = req.params.idPlayer;

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
    listAll,
    list,
    listByRank,
    save,
    updateAvatar,
    updateNickname,
    updateTitle,
    updatePassword
}