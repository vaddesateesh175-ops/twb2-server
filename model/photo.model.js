

var mongoose = require("mongoose");
var photoSchema = mongoose.Schema({
  photoUrl: String,
  username: String,
  Likes:{ 
        type: Number, 
        default: 0 
    },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  isPublic: Boolean,
});
var PhotoModel = mongoose.model("photo", photoSchema);
module.exports = PhotoModel;