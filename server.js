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

    connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

//Confirm connection to MySQL
  
    console.log("connected as id " + connection.threadId);
    });

// Parse application/x-www-form-urlencoded

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

//Set Handlebars as default templating engine

    app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");

//Custom helper function that console.logs info about client-side requests

    app.use(function(req, res, next) {
    
        console.log(`\n\n${req.method} request for '${req.url}' -${JSON.stringify(req.body)}`);
    
        next();
    });

//Show all current characters

    app.get("/", function(req, res) {
        
        connection.query("SELECT * FROM characters;", function(err, data) {
        if (err) throw err;
        var dataResponse = data;
        console.log("Data = ", data);
        res.render("index", { characters: data});
        });
    });

// Post route -> back to home

    app.post("/test", function(req, res) {
        // Test it
        //console.log('You sent, ' + req.body.name);
    
        // Test it
        // res.send('You sent, ' + req.body.task);
    
        connection.query("INSERT INTO characters (name) VALUES (?)", [req.body.name], function(err, result) {
            if (err) throw err;
        
            res.redirect("/");
        });
    });
    
//Delete a character

app.get('/delete/:id', (req, res) => {
    let deleteID = parseInt(req.params.id);
    if (isNaN(deleteID)) {
      //Handle invalid IDs, we only want integers
      res.send("Uh-oh! That ID isn't valid.");
    }
    // response.send('I am going to delete: ' + deleteID);
    connection.query(
      "DELETE FROM `characters` WHERE `id` = ?",
      deleteID,
      (err, results) => {
          if (err) {
            throw err;
          }
          console.log('Deleted ' + results.affectedRows);
          res.redirect("/");
    })
  });



    app.post("/save/:id", function(req, res) {

        let updateID = parseInt(req.params.id);

            if (isNaN(updateID)) {
                //Handle invalid IDs, we only want integers
                res.send("ERROR_INVALID_ID");
            }

        connection.query("SELECT * FROM characters WHERE id = " + updateID, function(err, data) {

            if (err) throw err;
            var dataResponse = data;
            console.log("Data = ", data);
            res.render("index", { savedCharacters: data});
        });
    });



//Call exported apiRoutes.js and htmlRoutes.js

    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);


    app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
    });