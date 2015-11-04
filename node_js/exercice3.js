var fs = require('fs');
var total = 0;
var data = fs.readFileSync('/Users/vincentbeauvieux/Documents/cours/TP_stepByStep/node_js/exercice2.js','utf8');
var data2 = data.split('\n');
console.log(data2.length);