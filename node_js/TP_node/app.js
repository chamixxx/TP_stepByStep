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
var authRoute = require("./app/routes/auth.route.js");
var IOcontroller = require("./app/controllers/io.controller.js");


//Init server
var app = express();
var server = http.createServer(app);
IOcontroller.listen(server);
server.listen(CONFIG.port);

//route
app.use("/",express.static(path.join(__dirname, "angular/login")));
app.use("/admin", express.static(path.join(__dirname, "angular/admin")));
app.use("/watch", express.static(path.join(__dirname, "angular/watcher")));
app.use("/loadPres", loadPresRoute);
app.use("/savePres", savePresRoute);
app.use("/slidRouter", slidRouter);
app.use("/authentication", authRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));







