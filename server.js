//Make all installed npms usable in server.js

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

const PORT = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set Handlebars as default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});