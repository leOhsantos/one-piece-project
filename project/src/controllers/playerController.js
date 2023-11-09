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

function authenticate(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    playerModel.checkEmailExists(email)
        .then(emailRes => {
            if (emailRes.length == 0) {
                res.status(403).send("Esse e-mail não existe!");
            } else {
                playerModel.authenticate(email, password)
                    .then(playerRes => {
                        if (playerRes.length == 0) {
                            res.status(403).send("E-mail ou senha inválidos!");
                        } else {
                            res.status(200).json(playerRes[0].idPlayer);
                        }
                    });
            }
        });
}

function save(req, res) {
    let nickname = req.body.nickname;
    let email = req.body.email;
    let password = req.body.password;
    let isNicknameRepeated = false;
    let isEmailRepeated = false;

    playerModel.listAll()
        .then(playerRes => {
            for (let i = 0; i < playerRes.length; i++) {
                if (nickname == playerRes[i].nickname) {
                    isNicknameRepeated = true;
                    break;
                }
            }

            for (let i = 0; i < playerRes.length; i++) {
                if (email.toUpperCase() == (playerRes[i].email).toUpperCase()) {
                    isEmailRepeated = true;
                    break;
                }
            }

            if (isNicknameRepeated) {
                res.status(403).send("Esse nickname já existe!");
            } else if (isEmailRepeated) {
                res.status(403).send("Esse e-mail já existe!");
            } else {
                playerModel.save(nickname, email, password)
                    .then(result => {
                        res.status(201).json(result);
                    }).catch(function (error) {
                        console.log(error);
                        res.status(500).json(error.sqlMessage);
                    });
            }
        });
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
    let isNicknameRepeated = false;

    playerModel.listAll()
        .then(playerRes => {
            for (let i = 0; i < playerRes.length; i++) {
                if (nickname == playerRes[i].nickname && idPlayer != playerRes[i].idPlayer) {
                    isNicknameRepeated = true;
                    break;
                }
            }

            if (isNicknameRepeated) {
                res.status(403).send("Esse nickname já existe!");
            } else {
                playerModel.updateNickname(nickname, idPlayer)
                    .then(result => {
                        res.json(result);
                    }).catch(function (error) {
                        console.log(error);
                        res.status(500).json(error.sqlMessage);
                    });
            }
        });
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
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let idPlayer = req.params.idPlayer;

    playerModel.list(idPlayer)
        .then(playerRes => {
            if (password != playerRes[0].password) {
                res.status(403).send("Senha atual incorreta!");
            } else {
                playerModel.updatePassword(newPassword, idPlayer)
                    .then(result => {
                        res.status(200).json(result);
                    }).catch(function (error) {
                        console.log(error);
                        res.status(500).json(error.sqlMessage);
                    });
            }
        });
}

module.exports = {
    listAll,
    list,
    listByRank,
    authenticate,
    save,
    updateAvatar,
    updateNickname,
    updateTitle,
    updatePassword
}