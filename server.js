require("dotenv").config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var connectDB = require("./db");
const dns = require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"])

var leadrouter=require("./routes/leads.router")
var todorouter=require("./routes/todos.router")

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
app.use("/leads",leadrouter)
app.use("/",todorouter)

app.listen(process.env.PORT || 3600, () => {
  console.log("server 3600 port lo vintundi");
});