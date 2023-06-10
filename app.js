require('dotenv').config();
const express = require("express");
const path = require("path");
const mongodb = require("./models/connectedb");




const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/post", require("./router/rout"));
app.use("/files", require("./router/files"));
app.use("/api/user/email", require("./router/sendEmail"));


app.get("/", (req, res) => {
    res.render("home")
})


app.get("/user", (req, res) => {
   res.render("download")
})


app.listen(port, () => console.log(`app is start on port no : ${port}`));