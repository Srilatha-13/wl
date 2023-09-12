const { createConnection } = require("mysql2");
const mysql = require("mysql2");

const db = createConnection({
    host: "localhost",
    user: "sri",
    password: "Srilatha_13",
    database: "wl",
});

db.connect((err) => {
    if (!err) {
        console.log("MySQL connected");
    } else {
        console.error("MySQL not connected", err);
    }
});

module.exports = db;
