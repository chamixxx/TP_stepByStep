// slid.router.js
"use strict";
var path = require("path");
var utils = require("../utils/utils.js");
var express = require("express");
var multer = require("multer");
var router = express.Router();
module.exports = router;

var app = express();
var slidController = require('./../controllers/slid.controllers.js');


var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
		  cb(null, 'uploads/');
	  },
	  filename: function (req, file, cb) {
		  console.log("\n \n file hehhehehehehhehehehehehehehheheheheheheh: " + JSON.stringify(file));
		  cb(null, utils.generateUUID() + path.extname(file.originalname));
	  }
});

var upload = multer({ storage: storage });

router.route('/slids')
.get(slidController.list)
.post(upload.single("file"),slidController.create);

router.route('/slids/:slidID')
.get(slidController.read);

router.param('slidID', function(request, response, next, id){
	request.slidID = id;
	next();
});






//.post(slidController.token,slidController.create);


/*
router.route('/users/:userId')
.get(slidController.read)
.put(slidController.update)
.delete(slidController.delete);

router.param('userId', function(req, res, next, id) {
req.userId = id;
next();
});

*/