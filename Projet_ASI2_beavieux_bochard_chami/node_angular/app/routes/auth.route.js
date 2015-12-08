var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;
var bodyParser = require('body-parser');
var requeste = require('request');
var querystring = require('querystring');


router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({     
  extended: true
})); 

router.route("/")
	.post(function(request,res) {

    console.log(request.body.login);
    console.log(request.body.pwd);
		
    requeste.post({
        headers: {'content-type' : 'application/json'},
        url:'http://localhost:8080/FrontAuthWatcherWebService2/test',
        json:  {
            "login":request.body.login,
            "pwd":request.body.pwd
          }
      }, function optionalCallback(err, httpResponse, body) {
	  		if (err || httpResponse.statusCode != 200) {
	    		return console.error('upload failed:', err);
	  		}
	  		console.log('Upload successful!  Server responded with:', body);
        res.json(body);
		});
});

	