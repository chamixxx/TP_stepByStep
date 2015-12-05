var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;
var bodyParser = require('body-parser');
var requeste = require('request');

var http = require('http');


router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({     
  extended: true
})); 

var querystring = require('querystring');
var http = require('http');


var options = {
    host: 'localhost',
    port: 9990,
    path: '/test',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};


router.route("/")
	.post(function(request,res) {

		var data = querystring.stringify(request.body);

		requeste.post({url:'http://localhost:9990/test', data}, function optionalCallback(err, httpResponse, body) {
	  		if (err) {
	    		return console.error('upload failed:', err);
	  		}
	  		console.log('Upload successful!  Server responded with:', body);
		});

/*
		var httpreq = http.request(options, function (response) {
   		 	response.setEncoding('utf8');
    		
    		response.on('data', function (chunk) {
      			console.log("body: " + chunk);
    		});
    	
    		response.on('end', function() {
      			res.send('ok');
    		})
  		});
 		httpreq.write(data);
  		httpreq.end();*/
});

	