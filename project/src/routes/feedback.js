const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.get("/list-by-stars", (req, res) => {
    feedbackController.listByStars(req, res);
});

router.get("/list-by-player/:idPlayer", (req, res) => {
    feedbackController.listByPlayer(req, res);
});

router.post("/save/:idPlayer", (req, res) => {
    feedbackController.save(req, res);
});

router.delete("/delete/:idPlayer", (req, res) => {
    feedbackController.deleteFeedback(req, res);
});

module.exports = router;