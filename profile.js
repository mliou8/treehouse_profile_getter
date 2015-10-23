var https = require("https");
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points";
  console.log(message);
  }

function printError(error) {
    console.error(error.message);
}

function get(username) {
var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
 var body = "";
  //read the data
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function() {
    if(response.statusCode === 200) {
      try {
         //parse the data
      var profile = JSON.parse(body);
        //print the data
      printMessage(username, profile.badges.length, profile.points.JavaScript)
      } catch(error) {
      //Parse Error
      printError(error);
      }
    } else {
      //Status Code Error
      printError({message: "There was an error getting the profile for " + username });
    }
    });
});

request.on("error", printError);
}

module.exports.get = get;