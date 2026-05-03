var dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const multer  = require('multer')

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Imagemodel=require("./model/image.model")

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
const imagesModel = require("./model/image.model");
dns.setServers(["1.1.1.1","8.8.8.8"])

connectDB();

app.post("/uploaduser",upload.single("profilepic"),(req,res)=>{
  console.log(req.body)
  console.log(req.file)

  var newImage= new Imagemodel({
    imgUrl:req.file.filename,
    filename:req.file.filename,
  })
  newImage.save()
  res.send("chedam uplod chedam")
})

app.get("/images",(req,res)=>{
  imagesModel.find().then((images)=>{
    res.send(images)
  })
})

app.get("/:id",(req,res)=>{
  imagesModel.findById(_id=req.params.id).then((data)=>{
    res.send(data)
  })
})

app.post("/like/:id",(req,res)=>{
  imagesModel.findById(_id=req.params.id).then((data)=>{
    data.Likes=data.Likes+1
    data.save()
    res.send(data)
  })

})

app.listen(process.env.PORT || 3600, () => {
  console.log("server 3600 port lo vintundi");
});