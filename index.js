/**
 * Import Modules
 */
const express = require("express");
const app = express();
const path = require("path");
var util = require("util");
var fs = require("fs");
var process = require("process");

/**
 * Variable Declaration
 */
const public = "public";

/**
 *  Fetching files in the public folder
 */
fs.readdir(public, function(err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  files.forEach(function(file, index) {
    // Make one pass and make the file complete
    if (file.indexOf(".html") > 0) {
      var filepath = path.join(public, file);
      var route = filepath.replace(".html", "").replace(public + "/", "");
      getFileStat(filepath,route);   
    }
  });
});

function getFileStat(filepath,route){
  fs.stat(filepath, function(error, stat) {
    if (error) {
      console.error("Error stating file.", error);
      return;
    }

    if (stat.isFile()) {
      createRoute(route, filepath);
      console.log("'%s' is a file.", filepath);
    }
  });
}

function createRoute(route, filepath) {
  filepath = "/" + filepath;
  /* ****************** Routes ******************* */
  app.get("/" + route, function(req, res) {
    res.sendFile(path.join(__dirname + filepath));
  });
}

/**************** Run Application*************/
app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));
app.listen(app.get("port"), function() {
  console.log("App is running, server is listening on port ", app.get("port"));
});
