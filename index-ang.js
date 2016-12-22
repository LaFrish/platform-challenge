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
app.use(parser.json({extended: true}));

// app.get("/", function(req, res){
//   res.render("app-welcome");
// });

app.get("/api/events",function(req, res){
  Event.find({}).then(function(events){
    res.json(events)
  });
});

app.get("/api/events/:name", function(req, res){
  Event.findOne({name: req.params.name}).then(function(event){
    res.json(event)
  });
});

app.post("/api/events", function(req, res){
  Event.create(req.body).then
  (function(event){
    res.json(event)
  })
});

app.put("/api/events/:name", function(res, req){
  Event.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(event){
    res.json(event)
  });
});

app.delete("/api/events/:name/delete",function(req, res){
  Event.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true})
  });
});

app.get("/*", function(req, res){
  res.render("events");
});

app.listen(app.get("port"), function () {
  console.log("Look at me maw, I'm working @ 9999!");
});

module.exports = app;
