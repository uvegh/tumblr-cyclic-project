const express=require('express')
const app=express.Router()
const Comment=require('../models/comment')

app.get('/comments',async(req,res)=>{

    try{
let comments= await Comment.find().populate("user").populate("post").populate("replies").exec()
//console.log(comments);
if(!comments)return res.json({
    code:401,
    msg:"cannot get comments"
})
res.json({
    data:comments,
    code:200
})
    }
    catch(err){
     res.status(500).send(err)
        console.log(err);
    }

})


app.get('/comment/:post',async(req,res)=>{

    try{
let comments= await Comment.find({post:req.params.post}).populate("post").populate("user",["username"]).populate("replies").exec()

comments.map((data)=>{
    //console.log("comment data",data.content); 
})
if(!comments)return res.json({
    code:401,
    msg:"cannot get comments"
})

res.json({
    "comments":comments,
    code:200
})
    }
    catch(err){
     res.status(500).send(err)
        console.log(err);
    }

})
app.delete('/comment/:id',async(req,res)=>{

    try{
let comment= await Comment.findById(req.params.id)
       if(!comment)return res.json({
        code:404,
        msg:"user does not exist"
       })
await Comment.findByIdAndDelete(req.params.id)
res.json({
    msg:"comment deleted"
})

       
       

    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }

})



module.exports=app