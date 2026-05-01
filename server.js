var dotenv = require("dotenv");
dotenv.config();



var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var TodoModel = require("./model/todo.model");

var LeadModel=require("./model/lead.model")
var connectDB = require("./db");


const dns = require("dns");

dns.setServers(["1.1.1.1","8.8.8.8"])

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.post("/addtodo", (req, res) => {
  console.log(req.body)
  
  console.log(req.body.title)
  var newTodo = new TodoModel({
    title: req.body.title,
    description:req.body.description,
    status: true,
    timeStamp: Date.now(),
  });
  newTodo.save().then(()=>{
    res.send("todo is added")
  });
});

app.get("/todos", (req, res) => {
  TodoModel.find().then((data) => {
    res.send(data);
  });
});

app.get("/leads",(req,res)=>{
  LeadModel.find().then((data)=>{
    console.log(req.data)
    res.send(data)
  })
})

app.post("/addlead", (req, res) => {
  console.log(req.body);
  var newLead = new LeadModel(req.body);
  newLead.save().then(() => {
    res.send("Ipoindi");
  });
});

app.get("/", (req, res) => {
  res.send("aagara babu");
});

app.listen(process.env.PORT || 3600, () => {
  console.log("server 3600 port lo vintundi");
});