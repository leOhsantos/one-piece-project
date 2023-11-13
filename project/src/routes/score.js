const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.get("/list", (req, res) => {
    scoreController.list(req, res);
});

router.get("/list-by-player/:idPlayer", (req, res) => {
    scoreController.listByPlayer(req, res);
});

router.get("/count-score-100", (req, res) => {
    scoreController.countScore100(req, res);
});

router.get("/count-speedrun-time", (req, res) => {
    scoreController.countSpeedrunTime(req, res);
});

router.get("/count-score-s", (req, res) => {
    scoreController.countScoreS(req, res);
});

router.post("/save/:idPlayer", (req, res) => {
    scoreController.save(req, res);
});

module.exports = router;