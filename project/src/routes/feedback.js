const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.get("/list-by-stars", function (req, res) {
    feedbackController.listByStars(req, res);
});

router.post("/save", function (req, res) {
    feedbackController.saveFeedback(req, res);
});

module.exports = router;