const { createConnection } = require("mysql2");
const mysql = require("mysql2");

const db = createConnection({
    host: "blklfjqthgfrgtjgytoc-mysql.services.clever-cloud.com",
    user: "uiyhhsfirprbxs2n",
    password: "xJodUlGLTXZZFHLMURVO",
    database: "blklfjqthgfrgtjgytoc",
});

db.connect((err) => {
    if (!err) {
        console.log("MySQL connected");
    } else {
        console.error("MySQL not connected", err);
    }
});

module.exports = db;
