var fs = require('fs');
var total = 0;
var data = fs.readFile('/Users/vincentbeauvieux/Documents/cours/TP_stepByStep/node_js/exercice2.js','utf-8',function(err,data) {
	if (err) throw err;
	var data2 = data.split('\n');
	console.log(data2.length);
});