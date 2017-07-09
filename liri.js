var boop = process.argv[2];
var choice = process.argv[3];
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
var params = {
	screen_name: 'chuppikk',
	count: 20
	}

var Spotify = require('node-spotify-api');
var keys2 = require('./keys2.js');
var spotify = new Spotify(keys2.spotifyKeys);
var request = require("request");
var fs = require('fs');



switch (boop) {

	case 'my-tweets':
	mytweets();
	break;

	case 'spotify-this-song':
	spotifyThis();
	break;

	case 'movie-this':
	movieWhat();
	break;

	case 'do-what-it-says':
	random();
	break;

}

function mytweets() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error && response.statusCode === 200) {
			console.log('Last 20 Tweets');
			for (var i = 0; i < tweets.length; i++) {
				console.log('--------------------');
				console.log("Tweeted on " + tweets[i].created_at);
				console.log("Tweet - " + tweets[i].text);
				console.log('--------------------');
		}
			}
		else {
			throw error;
		}

	});
}

// function spotifyThis() {
// 	spotify
// 		.search({ type: 'track', query: choice })
// 		.then(function(response) {
// 			console.log(JSON.stringify(response, null, 2));
// 		})
// 		.catch(function(err) {
// 			console.log(error);
// 		});

// }

function spotifyThis() {
	spotify.search({ type: 'track', query: choice }, function(err, data) {
		if(err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(JSON.stringify(data, null, 2));
		var parseObject = JSON.stringify(data, null, 2);

		fs.writeFile('spotifyObject.json', parseObject, (err)=> {
			if(err){
				return console.log("Spotify Object Error: " + err);
			}
		console.log(parseObject.tracks.items[0].artists[0].name);

		});
	});
}

// function spotifyThis() {
// 	request('https://api.spotify.com/v1/search?=' + choice + '&type=track', function(error, response, body) {

// 	var jBody = JSON.parse(body);

// 	console.log(JSON.stringify(body));
// 	});
// }

function movieWhat() {
	if (choice == null) {
		choice = 'Mr. Nobody';
	}
	var queryUrl = "http://www.omdbapi.com/?t=" + choice + "&tomatoes=true&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

		var Jbody = JSON.parse(body);

		console.log(' ');
		console.log('Title: ' + Jbody.Title);
		console.log('Year: ' + Jbody.Year);
		console.log('IMDB Rating: ' + Jbody.imdbRating);
		console.log('Rotten Tomatoes Rating: ' + Jbody.tomatoRating);
		console.log('Country: ' + Jbody.Country);
		console.log('Language: ' + Jbody.Language);
		console.log('Plot: ' + Jbody.Plot);
		console.log('Actors: ' + Jbody.Actors);

	});
}

function random() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			console.log(error);
		}
		else {
			var dataA = data.split(',');
			movieWhat(dataA[1]);
		}

	});
}