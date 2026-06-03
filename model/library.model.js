

var mongoose = require("mongoose");
var librarySchema = mongoose.Schema({
  booktitle: String,
  username: String,
  author: String,
  
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  isPublic: Boolean,
});
var LibraryModel = mongoose.model("libraries", librarySchema);
module.exports = LibraryModel;