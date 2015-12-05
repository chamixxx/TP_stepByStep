var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var ModelSlid = require("../models/slid.model.js");
var Utils = require("../utils/utils.js");

function SlidController() {};


SlidController.list = function(request, response) {
	fs.readdir(CONFIG.contentDirectory, function(err, files) {
		if (err) {
			console.error(err);
			response.status(500).send(err);
			return;
		}
		var jsonFiles = [];
		for (var i in files) {
			if (path.extname(files[i]) == ".json") {
				jsonFiles.push(files[i]);
			}
		}
		var listSlideReturn = {};
		jsonFiles.forEach(function(file, i){
			var id = path.basename(file, '.meta.json')
			ModelSlid.read(id,function(err, slidRetour) {
				if(err) {
					console.error(err);
					response.status(500).send(err);
					return;
				}
				slidRetour = JSON.stringify(slidRetour);
				slidRetour = JSON.parse(slidRetour);
				slidRetour.src = CONFIG.contentDirectory.slice(1)+ "/"+slidRetour.fileName;
				listSlideReturn[slidRetour.id] = slidRetour;
				if( (Object.keys(listSlideReturn)).length == jsonFiles.length) {
					console.log(listSlideReturn);
					response.send(listSlideReturn);
				}
			});
		});
	});
}

SlidController.create = function(request,response) {
	var id = Utils.generateUUID();
	var fileName = Utils.getNewFileName(id,request.file.originalname);
	var type = Utils.getFileType(request.file.mimetype);
	var title = request.file.originalname;
	fs.readFile(request.file.path,'utf-8',function(err,data) {
		console.log("here2");
		if(err){
			console.error(err);
			response.status(500).send(err);
			return;
		}
		var modelSlid = new ModelSlid();
		modelSlid.type = type;
		modelSlid.title = title;
		modelSlid.id = id;
		modelSlid.fileName = fileName;
		modelSlid.setData(data);
		console.log(JSON.stringify(modelSlid));
		ModelSlid.create(modelSlid,function(err){
			if(err) {
				console.error(err);
				response.status(500).send(err);
				return;
			}
			response.status(200).send();
		});
	});
}

SlidController.read = function(request, response) {
	var toRead = "";
	var urlParameter = Utils.getQueryVariable("json",request.slidID);
	var id = Utils.getQueryVariable("id",request.slidID);
	console.log(urlParameter);
	console.log(id);
	if(id == false) {
		console.error("id = false");
		response.status(500).send(err);
		return;
	}
	ModelSlid.read(id,function(err,slidModel){
		if (err) {
			console.error(err);
			response.status(500).send(err);
			return;
		}
		if(urlParameter == "true") {
			response.send(JSON.stringify(slidModel));
		}
		if(urlParameter == false) {
			fs.readFile(Utils.getDataFilePath(slidModel.fileName),'utf-8',function(err,data) {
				if(err) {
					console.error(err);
					response.status(500).send(err);
					return;
				}
				response.send(data);
			});
		}
	});
}

module.exports = SlidController;