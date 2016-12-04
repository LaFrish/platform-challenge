var express = require('express');
var parser = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

var Event =mongoose.model("Event");

app.set("port", process.env.PORT || 9999);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(9999, function () {
  console.log('Example app listening on port 9999!');
});

module.exports = app;
