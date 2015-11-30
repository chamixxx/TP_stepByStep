"use strict";
//Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var module1 = require('./app/utils/utils.js');

//Server configuration
var express = require("express");
var http = require("http");
var path = require("path");

var defaultRoute = require("./app/routes/default.route.js");
var loadPresRoute = require("./app/routes/loadPres.route.js");
var savePresRoute = require("./app/routes/savePres.route.js");
var slidRouter = require("./app/routes/slid.router.js");


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
app.use("/slidRouter", slidRouter);






