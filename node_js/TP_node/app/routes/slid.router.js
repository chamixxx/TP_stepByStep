// slid.router.js
"use strict";

var express = require("express");
var multer = require("multer");
var router = express.Router();
module.exports = router;

var app = express();
var slidController = require('./../controllers/slid.controllers.js');
var multerMiddleware = multer({"dest":"tmp/"});

router.route('/slids')
.get(slidController.list)
.post(multerMiddleware.single('file'),slidController.create);

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