module.exports = function(ext,path,callback) {

			var fs = require('fs');
			var modulepath = require('path');

			fs.readdir(path, function (err, files) {
  				if(err) {
  					return callback(err);
				}

  				var filtered = [];
  				for(var i in files) {
  					if(modulepath.extname(files[i]) === "." + ext) {
  						filtered.push(files[i]);
  					}
  				}
  				if(callback) {
					callback(null,filtered);
				}
			});
		
	
}