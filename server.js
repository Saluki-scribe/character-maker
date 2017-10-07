//Make all installed npms usable in server.js

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

//Send static 'assets' folder files used by the html files to the server

    app.use(express.static('public'));

//Set up user verification to access MySQL database

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "charactersDB"
    });

//Handle errors from MySQL

  /*  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

//Confirm connection to MySQL
  
    console.log("connected as id " + connection.threadId);
    });
*/
// Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

//Set Handlebars as default templating engine
    app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");

//Helper that console.logs info about client-side requests

    app.use(function(req, res, next) {
    
        console.log(`\n\n${req.method} request for '${req.url}' -${JSON.stringify(req.body)}`);
    
        next();
    });

//Call exported apiRoutes.js and htmlRoutes.js

    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);


    app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
    });