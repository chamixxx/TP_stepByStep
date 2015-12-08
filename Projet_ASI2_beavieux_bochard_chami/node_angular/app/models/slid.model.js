var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var Utils = require("./../utils/utils");


var ModelSlid = function(data_model) {
	
	//console.dir(data_model);
	this.type = (data_model && data_model.type) ? data_model.type : null;
	this.id = (data_model && data_model.id) ? data_model.id : null;
	this.title = (data_model && data_model.title) ? data_model.title : null;
	this.fileName = (data_model && data_model.fileName) ? data_model.fileName : null;
	var data = null;

	this.getData = function() {
		return this.data;
	}
	this.setData = function(data) {
		this.data = data;
	}
}

ModelSlid.create = function (slid, callback) {
	if(!(slid instanceof ModelSlid)){
		err = "parameter is not an instance of ModelSlid";
		callback(err);
		return;
	}
	if(slid.id == null) {
			err = "create : id is null";
			callback(err);
			return;
	}
	var pathToFile = CONFIG.contentDirectory + '/' + slid.id +  ".meta.json";
	slid = JSON.stringify(slid);
	fs.writeFile(pathToFile, slid, function(err) {
		if (err){
      		callback(err);
      		return;
      	}
      	else {
      		callback();
      	}
	});

}

ModelSlid.read = function (id, callback) {
	fs.readdir(CONFIG.contentDirectory, function(err, files) {
      	if (err){
      		callback(err);
      		return;
      	}
      	files.forEach(function(file, i) {
        	if( (files[i].indexOf(id) > -1) && path.extname(files[i]) === ".json") {
        		fs.readFile(CONFIG.contentDirectory + "/" + files[i], function(err, json) {
			         if (err){
			         	console.log(err);
			         	callback(err);
			         	return;
			         }
			         try {
			         	var slidinfo = JSON.parse(json);
			         }catch (e){
			         	console.log("error read while parsing target file to json");
			         }
			         console
			         var slidModel = new ModelSlid(slidinfo);
		         	 callback(null,slidModel);
		         	 return;
        		});
  			}
    	});
    });
}

ModelSlid.update = function (slid,callback) {
	fs.readdir(CONFIG.contentDirectory, function(err,files) {
		if(err){
			callback(err);
			return err;
		}
		files.forEach(function(file,i){
			if(files[i] == slid.id + ".meta.json") {
		        var updatedslid = JSON.stringify(slid);
	         	fs.writeFile(CONFIG.contentDirectory + "/" + file,updatedslid,function(err) {
	         		if (err){
	         			callback(err);
	         			return err;
	         		}
	         		if(slid.data == null || (slid.data).length < 1) {
	         			callback();
	         			return;
	         		}
	         		files.forEach(function(file,i){
						if(files[i] == slid.fileName) {
		        			if (err){
		        				callback(err);
		        				return err;
		        			}
				         	fs.writeFile(CONFIG.contentDirectory + "/" + slid.fileName,slid.data,function(err) {
				         		if (err){
				         			callback(err);
				         			return err;
				         		}			         		
				         		callback();
				         		return;
				         	});
						}
	         		});
	         	});
        	}
		});
	});
}

ModelSlid.delete = function(id,callback) {
	console.log("tu supr frere");
	ModelSlid.read(id,function(err,data){
		if (err) {
			callback(err);
			return;
		}
		fs.unlink(Utils.getDataFilePath(data.fileName),function(err){
			if (err) {
				callback(err);
				return;
			}
			fs.unlink(Utils.getMetaFilePath(id),function(err){
				if(err) {
					callback(err);
					return;
				}
				callback();
			})
		});

	})
}

module.exports = ModelSlid;



