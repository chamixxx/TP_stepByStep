"use strict";

var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = CONFIG.presentationDirectory;
module.exports = router;

router.route("/")
  .get(function(request, response) {
    var jsonToReturn = {};
    fs.readdir(relativePresentationDirectory, function(err, files) {
      if (err) throw err;
      var c = 0;
      //console.info(files);
      files.forEach(function(file, i) {
        c++;
        fs.readFile(relativePresentationDirectory + "/" + file,'utf-8', function(err, json) {
          if (err) throw err;
          if(path.extname(files[i]) === ".json") {
              jsonToReturn["pres" + i + ".id"] = JSON.parse(json);
          }
          if (0 === --c) {
            response.send(jsonToReturn);
          }
        });
      });
    });
  });
