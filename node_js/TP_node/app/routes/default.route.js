var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;

router.route("/")
	.get(function(req,response) {
		response.sendFile(path.join(__dirname,'../../angular/login','index.html'));
	})


