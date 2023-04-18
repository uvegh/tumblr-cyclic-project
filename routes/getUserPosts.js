const express=require('express')
const Post = require('../models/post')
const app=express.Router()

app.get('/user/post/:id',async(req,res)=>{
try{
    let usersPost= await Post.findById(req.params.id)
if(!usersPost)return json({msg:"user has no post"})
res.json({
    data:usersPost,
    code:200
})
}
catch(err){
    res.status(500).send(err)
    console.log(err);
}
})




module.exports=app