var dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


var login=require("./router/loginrouter");
var books=require("./router/booksrouter");
var mybooks=require("./router/libraryrouter");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var connectDB = require("./db");
const dns = require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"])

connectDB();
app.use(cors());

app.use(express.static(path.join(__dirname,"dist")));

app.use("/",login);
app.use("/",books);
app.use("/",mybooks)
app.get("/books",async (res,req)=>{
  const data = await book.find();
  res.send(data);
})

app.get("/books/:username",(req,res)=>{
  const data = book.find({username:req.params.username});
  res.send(data);
})



app.listen(process.env.PORT || 3600, () => {
  console.log(process.env.PORT || 3600, "port lo server start aindi");
});