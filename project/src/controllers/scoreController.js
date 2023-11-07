const scoreModel = require("../models/scoreModel");

function list(req, res) {
  scoreModel.list().then(function (result) {
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (error) {
    console.log(error);
    res.status(500).json(error.sqlMessage);
  });
}

function saveScore(req, res) {
  let rank = req.body.rank;
  let speedrunTime = req.body.speedrunTime;
  let idPlayer = req.body.idPlayer;

  if (rank == undefined) {
    res.status(400).send("rank está indefinido!");
  } else if (speedrunTime == undefined) {
    res.status(400).send("speedrunTime está indefinido!");
  } else if (idPlayer == undefined) {
    res.status(400).send("idPlayer está indefinido!");
  } else {
    scoreModel.saveScore(rank, speedrunTime, idPlayer)
      .then(result => {
        res.status(201).json(result);
      }).catch(function (error) {
        console.log(error);
        res.status(500).json(error.sqlMessage);
      });
  }
}

module.exports = {
  list,
  saveScore
}