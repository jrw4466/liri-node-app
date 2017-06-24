// Intialize File System
var fs = require("fs");

//NPM Packages
var request = require("request");
//var inquirer = require("inquirer");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//Local Files
var keys = require("./keys.js");

//Creates an object to authenacaite Twitter queries
var accountTweets = new Twitter(keys.twitterKeys);
//Limmit to 20 Tweets
var limitTweets = 20;

//Creates an object to auth Spotify queries
var spotifyInfo = new Spotify(keys.spotifyKeys);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		mySpotify();
		break;
	case "movie-this":
		myMovie();
		break;
	case "do-what-it-says":
		myDoWhatItSays();
		break;
  default: // Adds user instructions to re-select an available action
    console.log("Please select an action request listed below:");
    console.log("my-tweets, spotify-this-song, movie-this, do-what-it-says");
    break;
}

// Twitter API 
// -------------------------------------------------------------------
function myTweets() {

  var params = {screen_name: 'Smith39Bobby', count: limitTweets};
  accountTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log(error);
    } else if (!error) {
      console.log("\nThese are your last " + (tweets.length) + " tweets: \n");
        for (var i = 0; i < tweets.length; i++) {
          console.log("Tweets " + (i+1) + ": " + "\n" + tweets[i].text + 
            "\n" + "Created on: " + tweets[i].created_at);
          console.log("-------------------");
      }
    }
    });
};

// Spotify API 
// -------------------------------------------------------------------
function mySpotify() {

  spotifyInfo.search({ type: 'track', query: value, limit: '1' }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    } else {
      // Returns JSON info for selected track
      console.log(JSON.stringify(data, null, 2));

      // Returns href reference in JSON -- Need help going down levels in JSON to return data
      var album = data.tracks.href;
      console.log(album);
      
      //Check class activity with weather-js and geocoder (answer maybe here)
      }
  });
};


// USE THIS TO CLEAN UP THE REPONSE FOR SPOTIFY
//    console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("Spotify Track Search Results Below");
//     console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("");
//     console.log("This song you searched for: " + value);
//     console.log("");
//     console.log(response);
//     console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("");


//MOVIE DBM API
// -------------------------------------------------------------------

function myMovie() {

// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the movie name
var movieName = "";

// Capture all the words in the movie name (ignore first 3 node arguments)
for (var i = 3; i < nodeArgs.length; i++) {

// If TRUE, Build a string with the movie name.
 if (i > 3 && i < nodeArgs.length){
   movieName = movieName + "+" + nodeArgs[i];
 } else {
   movieName += nodeArgs[i];
 }
}

// Create URL query variable to store URL to request JSON from OMDB API
var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieName + "&y=&plot=short&r=json";
//console.log(queryUrl);

//Run request to the OMDB API with URL variable
request(queryUrl, function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

    // Then log the body details from the OMDB API
    console.log("");
    console.log("-------------------------------------");
    console.log("-------------------------------------");
    console.log("The Title of the movie: " + JSON.parse(body).Title);
    console.log("-------------------------------------");
    console.log("The release year of the movie: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Movie Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    //console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website;
    console.log("Genre: " + JSON.parse(body).Genre);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Awards: " + JSON.parse(body).Awards);
    console.log("-------------------------------------");
    console.log("-------------------------------------");
    console.log("");
   } else {
    console.log(error);
   };
 });
}

// DO-WHAT-IT-SAYS 
// -------------------------------------------------------------------
// Questions: How to connect spotify API using the readme txt file?
//
// // -------------------------------------------------------------------
// function myDoWhatItSays() {
//   var song = "I want it that way";
//   var spotify = new Spotify({
//   id: 'input key',
//   secret: 'input key'
// })

// // Trying to use the random.txt file to make a command to play a song for spotify.
// fs.readFile("random.txt", "utf8", function(err, data) {
// 	if (err){
// 		return console.log(err);
// 	}

// 	data = data.split(", ");
// 	var results = 0;
// })
// spotify
//   .search({ type: 'track', query: 'I Want it That Way', limit: 1 })
//   .then(function(response) {
//   	console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("Spotify Track Search Results Below for 'I want it that way': ");
//     console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("");
//     console.log(response);
// 	});

