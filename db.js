const { createConnection } = require("mysql");
const mysql = require("mysql");

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
