var express = require('express');
var parser = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

var Event =mongoose.model("Event");

app.set("port", process.env.PORT || 9999);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/events",function(req, res){
  Event.find({}).then(function(events){
    res.render("events-index", {
      events: events
    });
  });
});

app.get("/events/:name", function(req, res){
  Event.findOne({name: req.params.name}).then(function(event){
    res.render("events-show", {
      event: event
    });
  });
});

app.post("/events", function(req, res){
  Event.create(req.body.event).then
  (function(event){
    res.redirect("/events/" + event.name);
  });
});

app.post("/events/:name", function(res, req){
  Event.findOneAndUpdate({name: req.params.name}, req.body.event, {new: true}).then(function(event){
    res.redirect("/events/" + event.name);
  });
});

app.post("/events/:name/delete",function(req, res){
  Event.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/events")
  });
});

app.listen(app.get("port"), function () {
  console.log("Look at me maw, I'm working @ 9999!");
});

module.exports = app;
