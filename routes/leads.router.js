
// var LeadModel=require("../model/lead.model")

// router.post("/addlead", (req, res) => {
//   console.log(req.body);
//   var newLead = new LeadModel(req.body);
//   newLead.save().then(() => {
//     res.send("Ipoindi");
//   });
// });

// router.get("/leads",(req,res)=>{
//   LeadModel.find().then((data)=>{
//     // console.log(req.data)
//     res.send(data)
//   })
// })
// router.get("/:id",(req,res)=>{
//     LeadModel.findById(_id=req.params.id).then((data)=>{
//         // console.log(data)
//         res.send(data)
//     })
// })
// router.delete("/:id",(req,res)=>{
//     LeadModel.findByIdAndDelete(_id=req.params.id).then((data)=>{
//         res.send({msg:"delete ipoindi"})
//     })
// })
var router = require("express").Router();
const {
  addNewLead,
  getAllLeads,
  getLeadById,
  deleteLeadById,
} = require("../controlers/lead.controler");

router
  .post("/addlead", addNewLead)
  .get("/", getAllLeads)
  .get("/:id", getLeadById)
  .delete("/:id", deleteLeadById);

module.exports = router;

