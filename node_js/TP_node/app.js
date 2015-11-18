"use strict";
//Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var module1 = require('./app/utils/utils.js');

//Server configuration
var express = require("express");
var http = require("http");
var defaultRoute = require("./app/routes/default.route.js");
var loadPresRoute = require("./app/routes/loadPres.route.js");
var savePresRoute = require("./app/routes/savePres.route.js");
var path = require("path");

//Init server
var app = express();
var server = http.createServer(app);
server.listen(CONFIG.port);

//route
app.use("/",defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
app.use("/loadPres", loadPresRoute);
app.use("/savePres", savePresRoute);

var slidModel = require("./app/models/slid.model");
var json = require("./uploads/5095753f-14ca-4c1d-9236-52686ce9af4d.meta.json");

json.title="test en dur";


var slid = new slidModel(json);
slid.setData("test");
console.log(slid);
slidModel.create(slid,function(res){
	console.log("hereC");
	console.log(res);
});
slidModel.read("37ba76b1-5c5d-47ef-8350-f4ea9407276d",function(err,res) {
	console.log("hereR");
	console.log(res);
});

var json2 = require("./uploads/37ba76b1-5c5d-47ef-8350-f4ea9407276d.meta.json");
var slid2 = new slidModel(json2);
slid2.title = "MEGATEST";
slidModel.update(slid2,function(res) {
	console.log("hereU");
	console.log(res);
});

slidModel.deleteID("d6aad8cd-b3dc-4794-9e2e-efee903a3f5e",function(res) {
	console.log("hereD")
	console.log(res);
})



