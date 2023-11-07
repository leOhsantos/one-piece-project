const express = require("express");
const router = express.Router();

const questionErrorController = require("../controllers/questionErrorController");

router.get("/list-errors-by-question", function (req, res) {
    questionErrorController.listErrorsByQuestion(req, res);
});

router.get("/save", function (req, res) {
    questionErrorController.saveQuestionError(req, res);
})

module.exports = router;