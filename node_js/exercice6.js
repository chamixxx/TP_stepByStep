var path = process.argv[2];
var ext = process.argv[3];

var module1 = require('./module1.js');
var myModule1 = module1(ext,path,function(err,files) {
	if(err) {
		//handle it
	}
	else {
		console.log(files);
	}

});
