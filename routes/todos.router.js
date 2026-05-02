const router=require("express").Router()
var TodoModel = require("../model/todo.model");

router.post("/addtodo", (req, res) => {
  console.log(req.body)
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

router.get("/todos", (req, res) => {
  TodoModel.find().then((data) => {
    res.send(data);
  });
});

router.delete("/:id",(req,res)=>{
    TodoModel.findByIdAndDelete(_id=req.params.id).then((data)=>{
        res.send({msg:"deleted"})
    })
})

module.exports=router