const express=require("express");
var router=express.Router();
var book=require("../model/library.model");


router.post("/addbook", (req,res)=>{   
    console.log(req.body);
    const {username,booktitle,author}=req.body;
    book.findOne({booktitle})
    .then((already)=>{
        if(already){
           return res.send({msg:"Book is not available"});
        }
        var newbook=new book({
           username,booktitle,author
        });
       newbook.save()
       .then((data)=>{
          console.log(data);
          return res.send({msg:"book added successfully",data});
        })
        .catch((err)=>{
           console.log(err);
           return res.send({msg:"error in adding book"});
      })

    })
    .catch((err)=>{
        console.log(err);
        return res.send({
            msg: "error in checking book"
        });
    })
})





    
router.get("/books/:username",(req,res)=>{
    book.find({username:req.params.username})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:"error in getting books"});
    }) 
})


router.delete("/:id",(req,res)=>{
    book.findByIdAndDelete(_id=req.params.id).then((data)=>{
        res.send({msg:"book deleted successfully"})
    })
})

router.get("/:id",(req,res)=>{
    book.findById(_id=req.params.id).then((data)=>{
        res.send(data)
    })
})


module.exports=router;