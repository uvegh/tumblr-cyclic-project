const express=require('express')
const app=express.Router()
const Post=require('../models/post')

app.post('/likePost/:id',async(req,res)=>{


    try{
const post=await Post.findById(req.params.id).exec()
//console.log(post);
if(!post){
    return res.
    status(204)
    json({
msg:"post not found"
    })

}

if(!post?.likes?.includes(req.body.user)){
     post.likes.push(req.body.user)
    //console.log(req.body.user);
// post.likes.user=req.body.user

// post.likes.post=req.params.id


    await post.save()

    res.json({
        msg:"like updated",
        data:post,
        code:200
    })
    //console.log(post);
}
else if(post?.likes.includes(req.body.user)){
    post.likes.pull(req.body.user)
    await post.save()
    //console.log(post);

    
    res.json({
        msg:"like updated",
        data:post,
        code:200
    })
}

    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
})



module.exports=app