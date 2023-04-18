    const mongoose=require('mongoose')

    const Schema=mongoose.Schema
    
    const CommentSchema=mongoose.Schema({
content:{type: String,required:true},
user:{
    type:Schema.Types.ObjectId,ref:"user",required:true
 },
post:{
    type:Schema.Types.ObjectId,ref:"post",required:true
},
replies:[{type:Schema.Types.ObjectId,ref:"replies"}],
likes:[{type:Schema.Types.ObjectId,ref:'likeComment'}]

    },
    {timestamps:true})


    const Comment= mongoose.model('comments',CommentSchema)

    module.exports=Comment