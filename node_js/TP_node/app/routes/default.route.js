var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/")
	.get(function(req,response) {
		response.send("It works Vincent");
	})


