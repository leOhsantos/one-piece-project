const mysql = require("mysql2");
// const sql = require('mssql');

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
// const sqlServerConfig = {
//     server: "SEU_SERVIDOR",
//     database: "SEU_BANCO_DE_DADOS",
//     user: "SEU_USUARIO",
//     password: "SUA_SENHA",
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true,
//     }
// }

const mySqlConfig = {
    host: "localhost",
    database: "bdOnePieceQuiz",
    user: "root",
    password: "1999",
};

function execute(instruction) {
    // if (process.env.AMBIENTE_PROCESSO == "production") {
    //     return new Promise(function (resolve, reject) {
    //         sql.connect(sqlServerConfig).then(function () {
    //             return sql.query(instruction);
    //         }).then(function (results) {
    //             console.log(results);
    //             resolve(results.recordset);
    //         }).catch(function (error) {
    //             reject(error);
    //             console.log('ERRO: ', error);
    //         });
    //         sql.on('error', function (error) {
    //             return ("ERRO NO SQL SERVER (Azure): ", error);
    //         });
    //     });
    // } 

    if (process.env.AMBIENTE_PROCESSO == "development") {
        return new Promise(function (resolve, reject) {
            const connection = mysql.createConnection(mySqlConfig);
            connection.connect();
            connection.query(instruction, function (error, results) {
                connection.end();
                if (error) {
                    reject(error);
                }
                console.log(results);
                resolve(results);
            });
            connection.on('error', function (error) {
                return ("ERRO NO MySQL WORKBENCH: ", error.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (Produção ou Desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    execute
}