var express = require("express");
var app = express();

var fs = require("fs");
var jwt = require("jsonwebtoken");

var bodyParser = require("body-parser");
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.post("/login", (req, res) => {
  console.log(req.body);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/../users.txt").toString());
  var k = fd.find((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      return true;
    }
  });
  if (k) {
    //gen token
    var token = jwt.sign({ ...req.body }, "neekendu");
    res.send({ msg: "loginsuccess", token, username: req.body.username });
  } else {
    res.send({ msg: "loginfailed" });
  }
});

module.exports = router;