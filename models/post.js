const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PostSchema= mongoose.Schema({
   
title:{ type:String},
 content:{type:String},
tags:[{type:String}],
likes:[{type:Schema.Types.ObjectId,ref:'likePost'}],
text:{type:String},
user:{
   type:Schema.Types.ObjectId,ref:"user"
},
file:{
   type:String
},
link:{type:String},
comments:[{type:Schema.Types.ObjectId,ref:'comments'}],


},
{timestamps:true})

const Post=mongoose.model('post',PostSchema)

module.exports=Post