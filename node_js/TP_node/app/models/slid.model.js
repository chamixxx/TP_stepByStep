var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var Utils = require("./../utils/utils");
var Promise = require('promise');
module.exports = ModelSlid;

function ModelSlid(data_model) {
	
	this.type = "";
	this.id = Utils.generateUUID();
	this.title = "";
	this.fileName = "";
	this.data = "";

	if (data_model !== null) {
		try {
			data_model = JSON.parse(data_model);
		}catch (e){}
		if (data_model.type){this.type = data_model.type;}
		if (data_model.id){this.id = data_model.id;}
		if (data_model.title){this.title = data_model.title;}
		if (data_model.fileName){this.fileName = data_model.fileName;}
	}
	this.getData = function() {
		return this.data;
	}
	this.setData = function(data) {
		this.data = data;
	}
}

ModelSlid.create = function (slid, callback) {
	var file = CONFIG.contentDirectory + '/' + slid.fileName;
	var fd = fs.open(file,'w',function(err,fd) {
		if (err) {
			callback(err);
			return;
		}
		fs.write(fd,slid.getData(),function(err,res) {
			if(err){
				callback(err);
				return;
			}
			console.log("slid.filename success");
			var file = CONFIG.contentDirectory + '/' + slid.id + ".meta.json";
			var fd = fs.open(file,'w',function(err,fd) {
				if(err) {
					callback(err);
					return;
				}
				fs.write(fd,JSON.stringify(slid),function(err,res) {
					if (err) {
						callback(err);
						return err;
					}
					else {
						console.log("slid.metadata.json success");
						callback();
					}
				});
			});
		});
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
        		fs.readFile(CONFIG.contentDirectory + "/" + files[i],'utf-8', function(err, json) {
			         if (err){
			         	callback(err);
			         	return;
			         }
			         try {
			         	var slidinfo = JSON.parse(json);
			         }catch (e){
			         	console.log("error read while parsing target file to json");
			         }
			         var slidModel = new ModelSlid(slidinfo);
		         	 callback(null,slidModel);
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
        		fs.readFile(CONFIG.contentDirectory + "/" + file,'utf-8', function(err, json) {
        			if (err){
        				callback(err);
        				return err;
        			}
        			try {
        				var slidinfo = JSON.parse(json);
        			} catch(e) {
        				console.log("error read while parsing target file to json");
        			}
			        slidinfo.title = slid.title;
			        var updatedslid = JSON.stringify(slidinfo);
			        var fd = fs.open(CONFIG.contentDirectory + "/" + file,'w',function(err,fd) {
			        	if(err){
			        		callback(err);
			        	}
			         	fs.write(fd,updatedslid,function(err) {
			         		if (err){
			         			callback(err);
			         			return err;
			         		}
			         		if(slid.data ="" || (slid.data).length < 1) {
			         			callback();
			         		}
			         		files.forEach(function(file,i){
								if(files[i] == slid.filename) {
									fs.readFile(CONFIG.contentDirectory + "/" + file,'utf-8', function(err, json) {
					        			if (err){
					        				callback(err);
					        				return err;
					        			}
								        var fd = fs.open(CONFIG.contentDirectory + "/" + slid.filename,'w',function(err,fd) {
								         	fs.write(fd,slid.data,function(err) {
								         		if (err){
								         			callback(err);
								         			return err;
								         		}			         		
								         		callback();
								         	});
								        });
					        		});
								}
			         		});
			         	});
			        });
        		});
        	}
		});
	});
}

ModelSlid.deleteID = function(id,callback) {
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



