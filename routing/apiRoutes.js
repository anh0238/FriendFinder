var users = require("../data/friends");

module.exports = function(app) {
    // A GET route with the url `/api/friends`. 
    app.get("/api/friends", function(req, res) {
        res.json(users);
    });

    // A POST routes `/api/friends`.  
    app.post("/api/friends", function(req, res) {
        var matchedWith = {
            name: "",
            photo: "",
            difference: "" //this would be an integer. how do I illustrate that (like above for an empty string)?
        };

        //declare userData and userScores
        var userData = req.body;
        var userScores = userData.userScores

        var totalDifference;

        //Loop through users
        for (var i=0; i < users.length; i++) {
            var currentUser = users[i];
            totalDifference = 0;

            console.log(currentUser.name);

            //Loop through users' scores
            for (var j = 0; j < currentUser.scores.length; j++) {
                //declare variable for the current user's scores
                var currentUserScore = currentUser.scores[j];
                //declare variable for the user they are compared with
                var nextUserScore = userScores[j];

                //use absolute values to avoid negative differences
                totalDifference += Math.abs(parseInt(nextUserScore) - parseInt(currentUserScore));
            }

            if (totalDifference <= matchedWith.difference) {
                matchedWith.name = currentUser.name;
                matchedWith.photo = currentUser.photo;
                matchedWith.difference = totalDifference;
            }
        }

        users.push(userData);

        res.json(matchedWith);

    //For developing purposes, display user's matchedWith name in cosole
    console.log(matchedWith.name);


    //Future development, display user's matchedWith in a modal with name and photo

    });

};