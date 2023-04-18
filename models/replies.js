const mongoose =require('mongoose')
const Schema=mongoose.Schema
const RepliesSchema=Schema({
user:{
  type:Schema.Types.ObjectId,ref:"user",required:true
},
comment:{
    type:Schema.Types.ObjectId,ref:"comment",
    required:true

},

  content:{type:String},
  
    


})

const Replies= mongoose.model("replies",RepliesSchema)

module.exports=Replies