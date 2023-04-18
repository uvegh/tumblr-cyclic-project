const express=require('express')
const app=express.Router()
const Post=require('../models/post')

app.put('/post/:id',async(req,res)=>{

    try{
const post= await Post.findById(req.params.id).populate("user").populate("comments").exec()
if(!post) return json({
    msg:"post does not exist",
code:401
})
//console.log(req.body);
const updatedPost={...post._doc,...req.body}
post.overwrite(updatedPost)
await post.save()
//console.log(post);
res.json({
    msg:"post updated",
    data: post,
    code:200
})

    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }


})


app.get('/post/likes/:id',async(req,res)=>{
try{
let postlikes= await Post.findById(req.params.id)

}
catch(err){
    console.log(err);
    res.status(500).send(err)
}
    
})


module.exports=app