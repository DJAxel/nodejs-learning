const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
    console.log("This runs on every request");
    next();
});

app.use("/add-product", (req, res, next) => {
    res.send("<h1>Add product page</h1>");
});

app.use("/", (req, res, next) => {
    res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
