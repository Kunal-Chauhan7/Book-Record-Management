const express = require('express');

const Dbconnection = require("./DatabaseConnection");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books.js");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

Dbconnection();

const port = 7770;

app.use(express.json());

app.use('/users',usersRouter);
app.use('/books',booksRouter);

app.get('/', (req, res) => {
    res.status(200);
    res.send({
        "message": "Server is working great"
    });
});

app.get('*', (req, res) => {
    res.status(500).json({
        "message": "Route yet to be made"
    });
});

app.listen(port, () => {
    console.log("server is running on the 7770 port");
});