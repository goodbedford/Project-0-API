// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore');

// Route JS and Stylesheet
app.use(express.static(__dirname + '/public'));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// STATIC ROUTES

// root (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

var posts = [
	{id: 1, user: 'Jack', location: 'Patagonia', post: 'Its awesome'},
	{id: 2, user: 'Sarah', location: 'Himalayas', post: 'Its sweet' },
	{id: 1, user: 'Rob', location: 'Grand Canyon', post: 'Its cool' }
];

//API Routes

// blogposts
app.get ('/blogposts', function(req, res) {
	res.json(posts);
});

// Create new blogposts
app.post ('/blogposts', function(req, res) {
	var newPost = req.body;
	// set sequential id (last id in `phrases` array + 1)
	if (posts.length > 0) {
	  newPost.id = posts[posts.length - 1].id +  1;
	} else {
	  newPost.id = 0;
	};

	posts.push(newPost);
	res.json(newPost);

});




// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});