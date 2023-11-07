const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.get("/list-by-stars/:stars", function (req, res) {
    feedbackController.listByStars(req, res);
});

router.post("/save/:idPlayer", function (req, res) {
    feedbackController.saveFeedback(req, res);
});

module.exports = router;