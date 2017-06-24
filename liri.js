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
		movie();
		break;
	case "do-what-it-says":
		dowhatitsays();
		break;
}
// Put in additional case like else that shows error in console.log if wrong command is inputted.


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
      var data_object = JSON.stringify(data, null, 2);
      //console.log(data);
      //console.log(JSON.stringify(data, null, 2));
      console.log(JSON.parse(data_object).tracks.items);
      
      }
  });
};



// var nodeArgs = process.argv;
// var value = "";
// for (var i = 3; i < nodeArgs.length; i++) {
//   if (i > 3 && i < nodeArgs.length){
//     value = value + "+" + nodeArgs[i];
//   }
//    else {
//     value += nodeArgs[i];
//   }
// }


// spotify
//   .search({ type: 'track', query: value, limit: 1 })
//   .then(function(response) {
//   	console.log("-------------------------------------");
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
//   })
//   .catch(function(err) {
//     console.log("");
//     console.log(error);
//     console.log("");
// })
// }
// -------------------------------------------------------------------
// Spotify API



// MOVIE DBM API - Still need to review
// -------------------------------------------------------------------
// function movie() {
// // Store all of the arguments in an array
// var nodeArgs = process.argv;
// // Grab or assemble the movie name and store it in a variable called "value"
// var value = "";
// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {
// 	if (i > 2 && i < nodeArgs.length){
// 		value = value + "+" + nodeArgs[i];
// 	} else {
// 		value += nodeArgs[i];
// 	}
// }
// console.log(value);

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + value + "&y=&plot=short&r=json";
// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);
// request(queryUrl, function(error, response, body) {
//   // If the request was successful...
//   if (!error && response.statusCode === 200) {
//     // Then log the body from the site!
//     console.log("");
//     console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("The Title of the movie: " + JSON.parse(body).Title);
//     console.log("-------------------------------------");
//     console.log("The release year of the movie: " + JSON.parse(body).Year);
//     console.log("IMDB Rating: " + JSON.parse(body).Ratings);
//     console.log("Country: " + JSON.parse(body).Country);
//     console.log("Language: " + JSON.parse(body).Language);
//     console.log("Movie Plot: " + JSON.parse(body).Plot);
//     console.log("Actors: " + JSON.parse(body).Actors);
//     // console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website;
//     console.log("Genre: " + JSON.parse(body).Genre);
//     console.log("Actors: " + JSON.parse(body).Actors);
//     console.log("Awards: " + JSON.parse(body).Awards);
//     console.log("-------------------------------------");
//     console.log("-------------------------------------");
//     console.log("");
//    };
//  });
// }
// // -------------------------------------------------------------------
// // MOVIE DBM API



// // DO-WHAT-IT-SAYS
// // I have had a hard time figuring out this one. I really dont understand this function very well.
// // Also have been having a hard time finding out how to connect to the spotify API properly.
// // -------------------------------------------------------------------
// function dowhatitsays() {
//   var song = "I want it that way";
//   var spotify = new Spotify({
//   id: '54d72841e6a940adb2b5bf919507c6f6',
//   secret: '1181e12735de4805b84ecf1705dd0352'
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

