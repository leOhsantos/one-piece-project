process.env.AMBIENTE_PROCESSO = "development";

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.AMBIENTE_PROCESSO == "development" ? 3333 : 8080;

const app = express();

const indexRouter = require("./src/routes/index");
const playerRouter = require("./src/routes/player");
const scoreRouter = require("./src/routes/score");
const questionErrorRouter = require("./src/routes/questionError");
const feedbackRouter = require("./src/routes/feedback");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/player", playerRouter);
app.use("/score", scoreRouter);
app.use("/question-error", questionErrorRouter);
app.use("/feedback", feedbackRouter);

app.listen(PORT, function () {
    console.log(`Servidor rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORT} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO}.`);
});