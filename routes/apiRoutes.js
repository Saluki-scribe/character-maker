module.exports = function(app) {

//Display survey.html when user requests endpoint '/response'

    app.post("/response", function(req, res) {

        var charName = req.body.name;

        res.send("Client sent me " + charName);
        console.log("Respond, darn you!");
    });

}; //End module.exports