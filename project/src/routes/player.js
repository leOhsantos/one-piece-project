const express = require("express");
const router = express.Router();

const playerController = require("../controllers/playerController");

router.get("/list-all-players", function (req, res) {
  playerController.listAllPlayers(req, res);
});

router.get("/list-player", function (req, res) {
  playerController.listPlayer(req, res);
});

router.get("/list-player-by-rank", function (req, res) {
  playerController.listPlayerByRank(req, res);
});

router.post("/save", function (req, res) {
  playerController.savePlayer(req, res);
});

router.put("/update-avatar", function (req, res) {
  playerController.updateAvatar(req, res);
});

router.put("/update-title", function (req, res) {
  playerController.updateTitle(req, res);
});

router.put("/update-password", function (req, res) {
  playerController.updatePassword(req, res);
});

module.exports = router;