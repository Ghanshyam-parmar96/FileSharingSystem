require('dotenv').config();
const express = require("express");
const path = require("path");
const mongodb = require("./models/connectedb");
const rout = require("./router/rout");



const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));
app.use("/post", rout);


app.get("/", (req, res) => {
    res.render("home")
})


app.listen(port, () => console.log(`app is start on port no : ${port}`));