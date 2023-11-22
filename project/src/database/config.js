const mysql = require("mysql2");

const mySqlConfig = {
    host: "localhost",
    database: "OnePieceQuiz",
    user: "luffy",
    password: "nika"
};

function execute(instruction) {
    return new Promise(function (resolve, reject) {
        const connection = mysql.createConnection(mySqlConfig);
        connection.connect();
        connection.query(instruction, function (error, results) {
            connection.end();
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        connection.on('error', function (error) {
            return ("ERRO NO MySQL WORKBENCH: ", error.sqlMessage);
        });
    });
}

module.exports = { execute }