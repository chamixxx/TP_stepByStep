var sum = 0;

for (var i in process.argv) {
	var elm = process.argv[i];

	if (!Number.isNaN(Number(elm))) {
		sum = Number(elm) + sum;
	}
}
console.log(sum);

var sum = 0;

for (var i = 2;  i<process.argv.length; i++) {
	var elm = process.argv[i];
	sum = Number(elm) + sum;
}
console.log(sum);