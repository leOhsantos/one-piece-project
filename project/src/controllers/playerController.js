const playerModel = require("../models/playerModel");

function list(req, res) {
    let idPlayer = req.params.idPlayer;

    playerModel.list(idPlayer)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function authenticate(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    playerModel.authenticate(email, password)
        .then(playerRes => {
            if (playerRes.length == 0) {
                res.status(403).send("E-mail ou senha inválidos!");
            } else {
                res.status(200).json(playerRes[0].idPlayer);
            }
        });
}

function save(req, res) {
    let nickname = req.body.nickname;
    let isNicknameWithSpace = (/\s/).test(nickname);
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

            if (password.length < 8) {
                res.status(403).send("Digite uma senha de até pelo menos 8 caracteres!");
            } else if (isNicknameWithSpace) {
                res.status(403).send("Seu nickname não pode conter espaços!");
            } else if (nickname.length > 20) {
                res.status(403).send("Seu nickname é longo demais!");
            } else if (email.length > 45) {
                res.status(403).send("Seu e-mail é longo demais!");
            } else if (password.length > 45) {
                res.status(403).send("Sua senha é longa demais!");
            } else if (isNicknameRepeated) {
                res.status(403).send("Esse nickname já existe!");
            } else if (isEmailRepeated) {
                res.status(403).send("Esse e-mail já existe!");
            } else {
                playerModel.save(nickname, email, password)
                    .then(result => {
                        res.status(201).json(result);
                    }).catch(error => {
                        res.status(500).json(error.sqlMessage);
                    });
            }
        });
}

function updateAvatar(req, res) {
    let avatar = req.body.avatar;
    let idPlayer = req.params.idPlayer;

    playerModel.updateAvatar(avatar, idPlayer)
        .then(result => {
            res.json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function updateNickname(req, res) {
    let nickname = req.body.nickname;
    let isNicknameWithSpace = (/\s/).test(nickname);
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

            if (nickname == "") {
                res.status(403).send("Preencha o campo de nickname!");
            } else if (isNicknameWithSpace) {
                res.status(403).send("Seu novo nickname não pode conter espaços!");
            } else if (isNicknameRepeated) {
                res.status(403).send("Esse nickname já existe!");
            } else {
                playerModel.updateNickname(nickname, idPlayer)
                    .then(result => {
                        res.json(result);
                    }).catch(() => {
                        res.status(500).send("Seu novo nickname é longo demais!");
                    });
            }
        });
}

function updateTitle(req, res) {
    let title = req.body.title;
    let idPlayer = req.params.idPlayer;

    playerModel.updateTitle(title, idPlayer)
        .then(result => {
            res.json(result);
        }).catch(error => {
            res.status(500).json(error.sqlMessage);
        });
}

function updatePassword(req, res) {
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;
    let idPlayer = req.params.idPlayer;

    playerModel.list(idPlayer)
        .then(playerRes => {
            if (password == "" || newPassword == "" || confirmNewPassword == "") {
                res.status(403).send("Preencha todos os campos!");
            } else if (password.length < 8 || newPassword.length < 8) {
                res.status(403).send("Digite uma senha de até pelo menos 8 caracteres!");
            } else if (password != playerRes[0].password) {
                res.status(403).send("Senha atual incorreta!");
            } else if (newPassword != confirmNewPassword) {
                res.status(403).send("Senhas não coincidem!");
            } else {
                playerModel.updatePassword(newPassword, idPlayer)
                    .then(result => {
                        res.status(200).json(result);
                    }).catch(() => {
                        res.status(500).send("Sua nova senha é longa demais!");
                    });
            }
        });
}

module.exports = {
    list,
    authenticate,
    save,
    updateAvatar,
    updateNickname,
    updateTitle,
    updatePassword
}