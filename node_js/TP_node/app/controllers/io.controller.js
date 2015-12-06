var socketMap = {};
var currentPres = null;
var currentState = "PAUSED";
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
var presentationDirectory = CONFIG.presentationDirectory;
var curSlidIndex = 0;
var playerStarted = null;
var interval = 4000;
var isLastSlide = false;

function IOcontroller() {};

IOcontroller.listen = function(server) {

	if(server == undefined) {
		console.log("server undefined");
		return;
	}
	var io = require("socket.io")(server);
	io.on("connection", function(socket) {
		socket.emit("connection");
		socket.on("data_comm", function(uuid){
			socketMap[uuid] = socket;
		});

		socket.on('error', function(msg){
			console.log("error: " + msg);
		});

		socket.on("slidEvent", function(cmd){
			console.log(cmd.CMD);
			if(cmd.CMD == undefined) {
				console.log("cmd undefined:");
				return;
			}
			else if(cmd.CMD == "START" && cmd.PRES_ID != undefined) {
				IOcontroller.setUpPres(cmd.PRES_ID, function(err,msg){
					if(err) {
						socket.emit("errorClient", err);
					}
					else {
						console.log(msg);
						currentState = "PLAYING";
						if(playerStarted != null){
							clearInterval(playerStarted);
						}
						playerStarted = setInterval(function(){
							IOcontroller.play(socket);
						},interval);
					}	
				});
			}
			else if(currentPres != null){
				getIndexSlidToShow(cmd.CMD,function(err){
					if(err){
						socket.emit("errorClient", err);
					}
					else {
						if(playerStarted != null){
							clearInterval(playerStarted);
						}
						if(currentState = "PLAYING"){
							playerStarted = setInterval(function(){
								IOcontroller.play(socket);
							},interval);
						}
						var slid = currentPres.slidArray[curSlidIndex];
						socket.emit("currentSlidEvent", slid);
						if(!isLastSlide){
							socket.broadcast.emit("currentSlidEvent",slid);
						}
					}
				});
			}
		});
	});
}

IOcontroller.setUpPres = function(id, callback){
	fs.readFile(relativePresentationDirectory + "/" + file,'utf-8', function(err, pres) {
		if (err){
			callback(err);
			return;
		}
		currentPres = JSON.parse(pres);
		callback(null,"sucess");
		return;
	});
}

IOcontroller.play = function(socket){
	if(currentState = "PLAY" && currentPres != null){
		getIndexSlidToShow("NEXT",function(err){
			if(err) {
				socket.emit("errorClient", err);
			}
			else {
				var slid = currentPres.slidArray[curSlidIndex];
				socket.emit("currentSlidEvent",slid);
				if(!isLastSlide) {
					socket.broadcast(slid);
				}	
			}
		});
	}
}

IOcontroller.getIndexSlidToShow = function(cmd,callback) {
	isLastSlide = false;
	switch(cmd) {
		case "PAUSE":
			currentState = "PAUSE";
			break;
		case "BEGIN":
			curSlidIndex = 0;
			break;
		case "END":
			curSlidIndex = currentPres.slidArray.length-1;
			break;
		case "PREV":
			if(curSlidIndex > 0){
				curSlidIndex++;
			}
			break;
		case "NEXT":
			if(curSlidIndex < currentPres.slidArray.length-1){
				curSlidIndex++;
			}
			else{
				isLastSlide = true;
			}
			break;
		default: 
			callback("invalid cmd");
			return;
	}
	callback(null);
	return;
}

module.exports = IOcontroller;