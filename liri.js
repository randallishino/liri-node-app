
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


// conditionals to check for which 
function commandCheck() {
    if (command === 'my-tweets') {
        tweets();
    }
    else if (command === 'spotify-this-song'){
        getSpotify();
    }
    else if(command === 'movie-this') {

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
    if (!error) {

    for (var i = 0; i < 20; i++) {
      var text = tweets[i].text;
      var time = tweets[i].created_at;
      console.log(text); 
      console.log("NBA said :" + text + "on: " + time);
      console.log('----------');
    }
}
    else {
        console.log(error);
    }
})
};


function getSpotify() {
    
    var spotifyThis = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotifyThis.search({ type: 'track', query: 'Thriller' }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        else {
            console.log(data);
        }
});
};  




commandCheck();
