const express = require("express");
const router = express.Router();

const playerController = require("../controllers/playerController");

router.get("/list/:idPlayer", (req, res) => {
    playerController.list(req, res);
});

router.post("/authenticate", (req, res) => {
    playerController.authenticate(req, res);
});

router.post("/save", (req, res) => {
    playerController.save(req, res);
});

router.put("/update-avatar/:idPlayer", (req, res) => {
    playerController.updateAvatar(req, res);
});

router.put("/update-nickname/:idPlayer", (req, res) => {
    playerController.updateNickname(req, res);
});

router.put("/update-title/:idPlayer", (req, res) => {
    playerController.updateTitle(req, res);
});

router.put("/update-password/:idPlayer", (req, res) => {
    playerController.updatePassword(req, res);
});

module.exports = router;