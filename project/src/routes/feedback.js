const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.get("/list-by-stars/:stars", function (req, res) {
    feedbackController.listByStars(req, res);
});

router.get("/list-by-player/:idPlayer", function (req, res) {
    feedbackController.listByPlayer(req, res);
});

router.post("/save/:idPlayer", function (req, res) {
    feedbackController.save(req, res);
});

module.exports = router;