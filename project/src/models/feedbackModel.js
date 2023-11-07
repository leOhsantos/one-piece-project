const database = require("../database/config");

function listByStars(stars) {
  const instruction = `SELECT COUNT(idFeedback) FROM Feedback WHERE stars = ${stars};`;
  return database.execute(instruction);
}

function saveFeedback(stars, idPlayer) {
  const instruction = `INSERT INTO Feedback (stars, fkPlayer) VALUES ('${stars}, ${idPlayer});`;
  return database.execute(instruction);
}

module.exports = {
  listByStars,
  saveFeedback
}