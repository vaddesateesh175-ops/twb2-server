
var mongoose=require("mongoose")

var imageSchema=mongoose.Schema({
    imgUrl:String,
    filename:String,
    Likes:{ 
        type: Number, 
        default: 0 
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

var imagesModel=mongoose.model("images",imageSchema)
module.exports=imagesModel