
var express = require("express");

var router = express.Router();


var fs = require("fs");
router.get("/books", (req, res) => {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/../books.txt").toString());
    res.send(fd);
});

module.exports = router;



