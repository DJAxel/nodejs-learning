express = require("express");

app = express();

app.use("/", (req, res, next) => {
    console.log("Logging from my first middleware");
    next();
});

app.use("/", (req, res, next) => {
    console.log("Logging from my second middleware");
    next();
});

app.use("/users", (req, res, next) => {
    res.send("<h1>Users response</h1>");
});

app.use("/", (req, res, next) => {
    res.send("<h1>General response</h1>");
});

app.listen(3000);
