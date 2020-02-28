const express = require('express'); 
const app = express();
var server = require('http').Server(app);
const bodyParser = require("body-parser");
var fs = require('fs'); //Filesystem  

app.use(express.static('public'));

//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

var userList = {};

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/public/welcome.html');
});

app.post('/newpageheartbeat', (req, res) => {
	console.log(req);
	if (req.username)
	{
		if (userList[username] == undefined) { userList[username] = [new Date(), new Date()]; }
		userList[username][0] = new Date();
	}
	/*var myUID = req.body.uid;
	var emailToFollow = req.body.otherEmail;
	db.ref('users/profile/' + myUID + '/friends').once('value').then((snapshot) => {
		var numFollowing = snapshot.val().friendcount;
		var j = {friendcount: numFollowing + 1};
		j[numFollowing] = emailToFollow;
		db.ref('users/profile/' + myUID + '/friends').update(j);
	});*/
});

app.post('/updateheartbeat', (req, res) => {
	console.log(req);
	if (req.username)
	{
		if (userList[username] == undefined) { userList[username] = [new Date(), new Date()]; }
		userList[username][1] = new Date();
	}
});

app.get('/getonlinestatus', (req, res) => {
	console.log("Received online status request for: " + JSON.stringify(req.body));
	var postData = {"status":"ABORTED", "title":"Null"};
	if (userList[username] != undefined)
	{
		if (new Date() - userList[username][0] < 300000)
		{
			postData = {"status": "ONLINE", "title":""};
		}
		else if (new Date() - userList[username][1] < 21000)
		{
			let titleText = "Idle for " + Math.floor((new Date() - userList[username][0]) / 1000) + " seconds.";
			postData = {"status": "IDLE", "title":titleText};
		}
		else
		{
			let titleText = "Offline for " + Math.floor((new Date() - userList[username][1]) / 1000) + " seconds.";
			postData = {"status": "OFFLINE", "title":titleText};
		}
	}
	/*var postData = {"allPosts": false}
	postData.messages = [];
	if (Math.floor(Math.random() * 5) == 1) { postData.allPosts = true; }
	var possiblePosters = ["thanos", "iron man", "captain america", "thor"];
	var tagTypes = ["Sedan", "Porsche", "Lambo", "Tag", "DuckDuckGoose"];
	for (var i = 0; i < 5; i++)
	{
		var userPost = {};
		userPost.userId = 1;
		userPost.username = possiblePosters[Math.floor(Math.random() * possiblePosters.length)];
		userPost.userPicture = "N/A";
		userPost.postPicture = "N/A";
		userPost.tags = [];
		for (var a = 0; a < Math.floor(Math.random() * 4); a++)
		{
			userPost.tags.push(tagTypes[Math.floor(Math.random() * tagTypes.length)]);
		}
		userPost.message = "This is a homepage post: " + Math.floor(Math.random() * 100);
		userPost.timePosted = new Date().getTime() - Math.floor(Math.random() * 1000);
		postData.messages.push(userPost);
	}*/
	res.status(200).send(JSON.stringify(postData));

	
});


function updatePageTime(userString)
{
	userList[userString] = [new Date(), new Date()];
}

function updateHeartbeat(userString)
{
	if (userList[userString] == undefined) { userList[userString] = [new Date(), new Date()]; }
	userList[userString][1] = new Date();
}

server.listen(8080, () => {
    console.log('listening on 8080');
});