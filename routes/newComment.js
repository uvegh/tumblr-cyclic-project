const express = require('express')
const app = express.Router()
const Comment = require('../models/comment')
const Post=require('../models/post')
app.post('/:id/comment', async (req, res) => {


    if(!req.body?.content){
        return res.json({
            msg:"no content to post for comment",
            code:401
        })
    }
    try {
        //console.log(req.body);
        


        let newComment = new Comment({...req.body,post:req.params.id})
        //console.log(newComment);
        await newComment.save()
      
const updatedId =await Post.findByIdAndUpdate(req.params.id,{
    $push:{comments:newComment._id}
})
//console.log("updated id",updatedId);

        if (!newComment) return res.json({
            msg: "failed to comment",
            code: 404
        })

       
        res.json({
            data:newComment,
            msg: "comment has been added",
            code: 200
    
            
        })

      

       


    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }

})


app.post('/likeComment/:id',async(req,res)=>{


    try{
const comment=await Comment.findById(req.params.id).exec()
//console.log(comment);
if(!comment){
    return res.

    json({
msg:"comment not found"
    })

}

if(!comment?.likes?.includes(req.body.user)){
    comment.likes.push(req.body.user)
    //console.log(req.body.user);
// post.likes.user=req.body.user

// post.likes.post=req.params.id


    await comment.save()

    res.json({
        msg:"like updated",
        data:comment,
        code:200
    })
    //console.log(comment);
}
else if(comment?.likes.includes(req.body.user)){
    comment.likes.pull(req.body.user)
    await comment.save()
    //console.log(comment);

    
    res.json({
        msg:"like updated",
        data:comment,
        code:200
    })
}

    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
})





module.exports = app
