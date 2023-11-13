const express = require("express");
const router = express.Router();

const questionErrorController = require("../controllers/questionErrorController");

router.get("/list", (req, res) => {
    questionErrorController.list(req, res);
});

router.post("/save/:idPlayer", (req, res) => {
    questionErrorController.save(req, res);
});

module.exports = router;