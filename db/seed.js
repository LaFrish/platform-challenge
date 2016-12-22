var mongoose = require("./connection");
var seedData = require("./seed");

var Event = mongoose.model("Event");

Event.remove({}).then(function(){
  Event.collection.insert(seedData).then(function(){
    process.exit();
  });
});
