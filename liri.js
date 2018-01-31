require('dotenv').config()

var fs = require('fs');
var keys = require('./keys.js');
var spotify = require('spotify');
var Twitter = require('twitter');
var request = require('request');


var options = [
    'my-tweets',
    'spotify-this-song',
    'movie-this',
    'do-what-it-says'
];

var command = process.argv[2];

function commandCheck() {
    if (command === 'my-tweets') {
        tweets();
    }
}


function tweets() {
var params = {screen_name: 'NBA'};
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
    else {
        console.log(error);
    }
})
};

commandCheck();