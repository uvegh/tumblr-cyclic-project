const express=require('express')
const app=express.Router()
const Post=require('../models/post')
const verifyJWT=require('../middleware/verifyJwt')
const verifyRoles=require('../middleware/verifyRoles')
const User = require('../models/user')
app.get('/post', async(req,res)=>{
try{
let post= await Post.find().populate("user").populate({
    path:"comments", populate:{
        path:'user',
        select:['username','profilePic']
    }
}).populate({
    path:"comments",populate:{
        path:'replies',populate:{
            path:'user',
            select:['username','profilePic']
        }
        
    }
})

    

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





app.delete('/post/:id',async(req,res)=>{

    try{
        let post= await Post.findById(req.params.id)
        //console.log(user);
        if(!post) return res.json({msg:"post not found",code:404})
        await Post.findByIdAndDelete(req.params.id)
        res.json({
            msg:"post deleted",
            code:200
    })
}
catch(err){
    console.log(err);
    res.status(500).send(err)
}
})




module.exports=app