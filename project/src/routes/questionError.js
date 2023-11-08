const express = require("express");
const router = express.Router();

const questionErrorController = require("../controllers/questionErrorController");

router.get("/list-by-question/:idPlayer", function (req, res) {
    questionErrorController.listByQuestion(req, res);
});

router.get("/save/:idPlayer", function (req, res) {
    questionErrorController.save(req, res);
});

module.exports = router;