const express = require('express')
const app = express.Router()
const Follower = require('../models/followers')
const User=require('../models/user')
const Post =require('../models/post')
const Following = require('../models/following')
app.post('/:id/followers', async (req, res) => {




    try {
        let user = await User.findById(req.params.id).exec()
        //console.log(user);
        if (!user) return res.json({
            code: 404,
            msg: "user  not  found"

        })
        const newFollower= new Follower(req.body)
        await newFollower.save()
        //console.log(user);
       
if( !user?.followers?.includes(req.body.user)){
user.followers.push(req.body.user)
await user.save()
//console.log(user.followers);

const updateFollowing= await Following.findByIdAndUpdate(req.body.user,{
    $push:{user:user?._id} 
}
    )
//console.log(updateFollowing);

res.json({
    msg:"follower added",
    data:user,
    code:200
})
}
else if(user?.followers.includes(req.body.user)){

    user.followers.pull(req.body.user)
    //console.log(user.followers);
    await user.save()

    const updateFollowing= await Following.findByIdAndUpdate(req.body.user,{
        $pull:{user:user?._id} 
    }
        )
    //console.log(updateFollowing);
    res.json({
        msg:"follower removed",
        data:user,
        code:200
    })
}


    }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }

})

app.get('/:id/followers', async (req, res) => {




    try {
       let user= await User.findById(req.params.id).exec()
        //console.log(user);
        if (!user) return res.json({
            code: 404,
            msg: "user  not  found"

        })
        const followers=await User.find().where('_id').in(user?.followers).exec()
        //console.log("followers are",followers);
        if(!followers)return res.json({msg:"user has no followers"})
        res.json({
            data:followers,
            msg:"followers retrieved"
        })

   



    }
    catch (err) {
        res.status(500).send(err)
        //console.log(err);
    }

})

app.get('/:id/followingsPost', async (req, res) => {

   
    // try {
    //    let user= await User.findById(req.params.id).exec()
    //     //console.log(user);
    //     if (!user) return res.json({
    //         code: 404,
    //         msg: "user  not  found"

    //     })
    //     const followers=await User.find().where('_id').in(user?.followers).sort().exec()
    //     if(!followers)return res.json({msg:"user has no followers"})
    //     //console.log("followers are",followers);

    //     const followersPost= await Post.find().where('user').in(user?.followers).sort().exec()
    //    //console.log("followers post",followersPost);
    //    res.json({
    //     msg:"followers post retrieved",
    //     code:200,
    //     data:followersPost
    //    })
       


   



    // }

    try {
       let user= await User.findById(req.params.id).exec()
        //console.log(user);
        if (!user) return res.json({
            code: 404,
            msg: "user  not  found"

        })
        const following=await User.find().where('_id').in(user?.following).sort().exec()
        if(!following)return res.json({msg:"user is not following anyone"})
        //console.log("followers are",following);

        const followingPost= await Post.find().where('user').in(user?.following).sort().exec()
       //console.log("followings post",followingPost);
       res.json({
        msg:"followings post retrieved",
        code:200,
        data:followingPost
       })
       


   



    }
    
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }

})



module.exports = app
