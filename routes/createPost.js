const express=require('express')
const app=express.Router()
const Post= require('../models/post')
const fs=require('fs')
const verifyJWT=require('../middleware/verifyJwt')
const multer=require('multer')
const path=require('path')
const User = require('../models/user')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        let extname=path.extname(file.originalname)
        cb(null,Date.now() +extname)
    }
})

const upload=multer({
storage:storage
})

app.post('/post',upload.single('file'),async(req,res)=>{
    //console.log(req);
    try{
        let newPost= new Post(req.body)
      
    //   //console.log("file", req.file);
    //   //console.log(req.file.path);
if(req.file){
    newPost.file=req.file.path;
    
    //console.log(req.file.path);
}

await newPost.save()
res.json({
    msg:"post created",
    data:newPost,
    code:200


})

const updateUserPost= await User.findByIdAndUpdate(req?.body?.user,{
    $push:{post:newPost._id}
})
// console.log(updateUserPost);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
})


module.exports = app;
