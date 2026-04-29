var express=require("express")
var bodyparse=require("body-parser")
var fs=require("fs");
const { error } = require("console");
var count=0;

var todos=["play football","pay bills","go to usa"]

var app=express()
//middle ware
app.use(express.static(__dirname+"/public"))
app.use(bodyparse.urlencoded({extended: false}))
app.use(bodyparse.json())

app.listen(3600,()=>{})

app.get("/add/:x/:y",(req,res)=>{
    var a=+req.params.x;
    var b=+req.params.y;
    sum=a+b
    res.send(sum)
})

app.get("/add",(req,res)=>{
    var c=+req.query.a;
    var d=+req.query.b;
    res.send(c+d)
})

app.post("/sum",(req,res)=>{
    var a=+req.body.a;
    var b=+req.body.b;
    res.send(a+b)
})

app.get("/counter",(req,res)=>{
    res.send(count)
})

app.get("/inc",(req,res)=>{
    res.send(++count)

})
app.get("/dec",(req,res)=>{
    res.send(--count)
})

app.get("/todos",(req,res)=>{
    res.send(todos)
})

// app.post("/issue",(req,res)=>{
//     var data=fs.writeFileSync(__dirname+"/data.json")
//     var fd=JSON.parse(data)
//     fd.push(req.body)
//     fs.writeFileSync(__dirname+"/data.json",JSON.stringify(fd))

//     console.log(req.body)
//     res.send("please wait")
// })

//  app.post("/issue",(req,res)=>{
//     var data=fs.readFileSync(__dirname+"/data.txt")
//     var fd=JSON.parse(data)
//     fd.push(req.body)
//     fs.writeFileSync(__dirname+"/data.txt",JSON.stringify(fd))
//     console.log(req.body)     
//     res.send("please wait")

//  })


//syncronus
// app.post("/issue",(req,res)=>{
//     var data=fs.readFileSync(__dirname+"/data.txt")
//     var fd=JSON.parse(data)
//     fd.push(req.body)
//     fs.writeFileSync(__dirname+"/data.txt",JSON.stringify(fd))
//     console.log(req.body)
//     res.send("please wait")
// })
 //async,promise
 

//async
app.post("/issue",(req,res)=>{
    fs.readFile(__dirname+"/data.txt",(error,data)=>{
        if(error){
            console.log(error +"vachindira")
        }
        else{
            var fd=JSON.parse(data)
            fd.push(req.body)
            fs.writeFile(__dirname+"/data.txt",JSON.stringify(fd),(error)=>{
                if(error){
                  console.log(error +"vachindira")
                } 
                else{
                    console.log("data vachindi")

                }
            })
            console.log(req.body)
            res.send("ohh")

        }
    })
})


















// var express=require('express');
//  var bodyparse=require('body-parser')
// var app=express();

// app.use(express.static(__dirname+"/public"))
// app.use(bodyparse.urlencoded({extended: false}))
// app.use(bodyparse.json())

// app.listen(3600,()=>{
//     console.log('Server is running');
// });

// app.get("/add/:x/:y",(req,res)=>{
//     var  p=+req.params.x;
//     var  q=+req.params.y;
//     res.send(p+q)
// })

// app.get("/add",(req,res)=>{
//     console.log(req.query)
//     var p=+req.query.a;
//     var q=+req.query.b;
//     res.send(p+q)  
// })

// app.post("/post",(req,res)=>{
//     var p=+req.query.a;
//     var q=+req.query.b;
//     res.send(p+q)  
// })

// app.get("/sum",(req,res)=>{
//     console.log(req.body)
//     res.sendFile(__dirname+"/public/form.html")
// })