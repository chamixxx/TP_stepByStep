var fs = require('fs');
var modulepath = require('path');
var result = '';
var path = process.argv[2];
var ext = process.argv[3];
fs.readdir(path, function (err, files) {
  if (err) throw err;
  for(var i in files) {
  	if(modulepath.extname(files[i]) === "." + ext) {
  		console.log(files[i]);
  	}
  }
});