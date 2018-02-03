
// importing our packages needed 
require('dotenv').config()
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// list of commands
var options = [
    'my-tweets',
    'spotify-this-song',
    'movie-this',
    'do-what-it-says'
];




// command will be this argument
var command = process.argv[2];


// conditionals to check for which command entered
function commandCheck() {
    if (command === 'my-tweets') {
        tweets();
    }
    else if (command === 'spotify-this-song'){
        getSpotify();
    }
    else if(command === 'movie-this') {
        OMDB();
    }
    else if(command === 'do-what-it-says'){

    }
}


//getting tweets
function tweets() {

    // twitter keys/access tokens
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });
      
      // screen name to search
var params = {screen_name: 'NBA'};

// twitter method for a get response
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {

    // looping and getting 20 tweets
    for (var i = 0; i < 20; i++) {
      var text = tweets[i].text;
      var time = tweets[i].created_at;
      console.log(text); 
      console.log("NBA said :" + text + "on: " + time);
      console.log('----------');
    }
}
    // error handling
    else {
        console.log(error);
    }
})
};


// searching a spotify song
function getSpotify() {

    var song = process.argv[3];
    
    // spotify token
    var spotifyThis = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });


    // spotify's npm method 
    spotifyThis.search({ type: 'track', query: song, limit: 1 }, function(error, data) {

       // error handling
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        // logging song info
        else {
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].album.external_urls.spotify);
            console.log("Album name: " + data.tracks.items[0].album.name);
        }
});
}; 

// get movie
function OMDB() {
    var movie = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // var twoWordMovie = process.argv[3] + process.argv[4];
    request(queryUrl, function(error, response, body) {
        if(!error & response.statusCode === 200){
            console.log(queryUrl);
            console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("-----------");
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("-----------");
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("-----------");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("-----------");
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("-----------");
            console.log("Language: " + JSON.parse(body).Language);
            console.log("-----------");
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("-----------");
            console.log("Actors/Actresses: " + JSON.parse(body).Actors);
        }
    });
};





commandCheck();
