const express=require('express')
const app=express.Router()
const Post=require('../models/post')
const verifyJWT=require('../middleware/verifyJwt')
const verifyRoles=require('../middleware/verifyRoles')

app.get('/post/:id', async(req,res)=>{
    try{
    let post= await Post.findById(req.params.id).populate("user").exec()
    
        
    
    if(!post) return res.json({msg:"post doesnt exist",code:404})
    //console.log(post);
    res.json({
        data:post,
        code:200,
        msg:"post successfully retrieved"
    })
    
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
    
    
    
    })


    module.exports=app