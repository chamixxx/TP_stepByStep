"use strict";

var express = require("express");
var router = express.Router();
var fs = require('fs');
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = CONFIG.presentationDirectory;
module.exports = router;

router.route('/')
	.post(function(request,response){
		var body = '';
		request.on('data', function(chunk) {
			body += chunk.toString();
		});
		request.on('end', function(){
			try{
				var pres = JSON.parse(body);
			} catch(er) {
				console.log(er);
			}
			var idpress = Object.keys(pres);
			var towrite = JSON.stringify(pres);
			// var towrite2 = '';
			//for(var i=12; i < towrite.length-1; i++){
				//towrite2 = towrite2 + towrite.charAt(i);
			//}
			var file = CONFIG.presentationDirectory + '/' + pres['id'] + ".pres.json";
			fs.unlinkSync(file);
			console.info(pres);
			var fd = fs.open(file,'a',function(err,fd) {
				fs.write(fd,towrite,function(err) {
				if (err) throw err;
				console.log("file written");
				response.send("toto");
				});
			});
		});


	});