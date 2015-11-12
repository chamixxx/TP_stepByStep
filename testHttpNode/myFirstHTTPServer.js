//Lets require/import the HTTP module
var http = require('http');
var express = require("express");
var bodyParser = require('body-parser')
var app = express();


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

const PORT=8080; 


app.post('/fakeauthwatcher', function (req, res) {
    console.log(req.body);
    if (userMap[req.body.login]==req.body.pwd) {
    	var loginSuccess = {
    		"login":req.body.login,
    		"validAuth":true,
    		"role":"admin"
    	};
    }
    else {
    	var loginSuccess = {
    		"login":req.body.login,
    		"validAuth":false,
    		"role":""
    	};
    }
    res.status(200).send(loginSuccess);
});

app.listen(PORT);
