// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#haikuchallenge' hashtag, ignoring retweets.
var haikuGrab = {q: "#haikuchallenge -is:retweet", count: 10, result_type: "recent"}; 

// This function finds the latest tweet with the #haikuchallenge hashtag, 'uwuifies' the text, and posts the new tweet.
function uwuPost() {
	T.get('search/tweets', haikuGrab, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the text of the original tweet
		  var haikuOrig = data.statuses[0]

		  var haikuOrigText=haikuOrig.text;

		  var haikUWU = ""
		  //...then we change all L's and R's into w's to properly 'uwuify' our text. @'s are also changed to avoid errors in linking to accounts.
		  for (let i in haikuOrigText) {
			  var temp = haikuOrigText[i]
			  if (temp !== 'l' && temp !== 'L' & temp !== 'r' && temp !== 'R' && temp !=='@') {
				  haikUWU += haikuOrigText[i]
			  } else if (temp === '@') {
				  haikUWU += 'from '
			  } else {
				  haikUWU += 'w'
			  }
		  }

		// ...and then we tell Twitter we want to post it!
		T.post('statuses/update', {status: haikUWU}, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// Try to uwuify something as soon as we run the program...
uwuPost();
//Interval for posting, in milliseconds
setInterval(uwuPost, 1000 * 60 * 60);
