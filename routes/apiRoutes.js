module.exports = function(app) {
    
//Send static 'assets' folder files used by the html files to the server

   //app.use(express.static('./app/assets'));

//Display survey.html when user requests endpoint '/survey'

    app.get("/results", function(req, res) {
        res.render("index");
    });

}; //End module.exports