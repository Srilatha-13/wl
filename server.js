const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const morgan = require("morgan");

// db connection
const db = require("./db");

// extra functions
app.use(morgan('dev'));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get route
app.get("/", (req, res) => {
    db.query("SELECT * FROM student", (error, result) => {
        try {
            if (!error) {
                res.render("hello", { students: result });
                console.log(result);
            } else {
                console.log(error);
            }
        } catch (err) {
            console.log("err", err);
        }
    });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.get("/student/update/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT * FROM student WHERE id_student = ${id}`,
        (error, results) => {
            if (!error) {
                res.render("update", { students: results[0] });
                console.log(results);
            } else {
                console.log(error);
            }
        }
    );
});

// post route
app.post("/student/create", (req, res) => {
    const { name_student, age_student, dept_student } = req.body;
    db.query(
        "INSERT INTO student(name_student, age_student, dept_student) VALUES(?, ?, ?)",
        [name_student, age_student, dept_student],
        (error, result) => {
            if (!error) {
                console.log(result);
                res.redirect("/");
            } else {
                console.log("Error", error);
            }
        }
    );
});

// delete route
app.post("/student/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        `DELETE FROM student WHERE id_student = ${id}`,
        (error, results) => {
            if (!error) {
                res.redirect("/");
            } else {
                console.log(error);
            }
        }
    );
});

// update route
app.post("/student/update/:id", (req, res) => {
    const id = req.params.id;
    const { name_student, age_student, dept_student } = req.body;
    db.query(
        "UPDATE student SET name_student = ? , age_student = ?, dept_student = ? WHERE id_student = ?",
        [name_student, age_student, dept_student, id],
        (error, result) => {
            if (!error) {
                console.log(result);
                res.redirect("/");
            } else {
                console.log("Error", error);
            }
        }
    );
});

app.listen(8080, () => {
    console.log(`Server is running on 8080`);
});
