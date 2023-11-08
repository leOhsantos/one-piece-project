const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/scoreController");

router.get("/list", function (req, res) {
    scoreController.list(req, res);
})

router.post("/save/:idPlayer", function (req, res) {
    scoreController.save(req, res);
});

module.exports = router;