const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.get("/list", function (req, res) {
    scoreController.list(req, res);
});

router.get("/list-by-player/:idPlayer", function (req, res) {
    scoreController.listByPlayer(req, res);
});

router.get("/count-score-100", function (req, res) {
    scoreController.countScore100(req, res);
});

router.get("/count-speedrun-time", function (req, res) {
    scoreController.countSpeedrunTime(req, res);
});

router.get("/count-score-s", function (req, res) {
    scoreController.countScoreS(req, res);
});

router.post("/save/:idPlayer", function (req, res) {
    scoreController.save(req, res);
});

module.exports = router;