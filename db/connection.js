var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema(
  {
    name: String,
    start: Date,
    end: Date,
  }
);
mongoose.model("Event", EventSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGO_URL);
}else{
  mongoose.connect("mongodb://localhost/platform-challenge");
}
module.exports = mongoose;
