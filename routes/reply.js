const express = require('express')
const app = express.Router()
const Comment = require('../models/comment')
const Reply=require('../models/replies')

app.post('/:id/reply', async (req, res) => {




    try {
        let comment = Comment.findById(req.params.id)
        if (!comment) return res.json({
            code: 404,
            msg: "commment not  found"

        })
       



        let newReply = new Reply({ ...req.body, comment: req.params.id })
        
       
        //console.log("new request",req.body);
        await newReply.save()
       
        

     
       const updateComment= await Comment.findByIdAndUpdate(req.params.id,{
        $push:{replies:newReply._id}
       })
       //console.log("updated comment is",updateComment);

        res.json({
            data: newReply,
            msg: "reply has been added",
            code: 200


        })






    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }

})
module.exports = app
