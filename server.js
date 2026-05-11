var dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var app = express();
var fs = require("fs");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const multer  = require('multer')

app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PhotoModel=require("./model/photo.model")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(req.body)
    console.log("file details",file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+ '-' +file.originalname  )
  }
})
const upload = multer({ storage})

var connectDB = require("./db");
const dns = require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"])

connectDB();

app.use(cors());

app.post("/uploadPhoto", upload.single("photo"), (req, res) =>{
  res.send({msg:"agurababu"})
  
  var k=jwt.verify(req.headers.token,"neekendu");
  console.log(k);
  // console.log(req.headers.token);
  var newPhoto=new photomodel({
    photoUrl:req.file.filename,
    username:k.username,
  })
  newPhoto.save()
})

app.get("/photos",(req,res)=>{
  var {username}=jwt.verify(req.headers.token,"neekendu");
   PhotoModel.find({ username: username }).then((data) => {
    res.send(data);
  });
})

app.get("allphotos",(req,res)=>{
  PhotoModel.find().then((data)=>{
    res.send(data);
  })
})
  

app.post("/login", (req, res) => {
  console.log(req.body);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
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

app.listen(process.env.PORT || 3600, () => {
  console.log(process.env.PORT || 3600, "port lo server start aindi");
});