const express=require('express');
const verifyJWT = require('../middleware/verifyJwt');
const User = require('../models/user');
const rolesList= require('../config/rolesList')

const verifyRoles=require('../middleware/verifyRoles')
const app=express()

app.get('/users',async(req,res)=>{

    try{
let users=await User.find().populate("followers").sort().exec()
if(!users) return res.json({msg:"user does not exist",code:404})
res.json({
    data:users,
    code:200
})

    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }


})

app.get('/user/:id',async(req,res)=>{
    try{

        let user= await User.findById(req.params.id)
        if(!user)return res.json({ msg:"user does not exist",code:401})
        //console.log(user);
    res.json({
        msg:"user found",
        data:user,
        code:401
    })

    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
   

})




module.exports=app