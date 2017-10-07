module.exports = function(app) {
    
//Send static 'assets' folder files used by the html files to the server

   //app.use(express.static('./app/assets'));

//Display survey.html when user requests endpoint '/response'

    app.post("/response", function(req, res) {
        res.send("Client sent me " + req.body.name);
        console.log("Respond, darn you!");
    });

}; //End module.exports