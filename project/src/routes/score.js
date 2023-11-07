const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.get("/list", function (req, res) {
    scoreController.list(req, res);
})

router.post("/save", function (req, res) {
    scoreController.saveScore(req, res);
});

module.exports = router;