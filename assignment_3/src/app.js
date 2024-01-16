const express = require("express");
const path = require("path");

const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);
app.use("/users", userRoutes);

app.listen(3000);
