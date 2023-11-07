const express = require("express");
const router = express.Router();

const playerController = require("../controllers/playerController");

router.get("/list-all-players", function (req, res) {
  playerController.listAllPlayers(req, res);
});

router.get("/list-player/:idPlayer", function (req, res) {
  playerController.listPlayer(req, res);
});

router.get("/list-player-by-rank", function (req, res) {
  playerController.listPlayerByRank(req, res);
});

router.post("/save", function (req, res) {
  playerController.savePlayer(req, res);
});

router.put("/update-avatar/:idPlayer", function (req, res) {
  playerController.updateAvatar(req, res);
});

router.put("/update-nickname/:idPlayer", function (req, res) {
  playerController.updateNickname(req, res);
});

router.put("/update-title/:idPlayer", function (req, res) {
  playerController.updateTitle(req, res);
});

router.put("/update-password/:idPlayer", function (req, res) {
  playerController.updatePassword(req, res);
});

module.exports = router;