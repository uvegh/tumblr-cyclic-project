const express=require('express')
const app=express.Router()
const User=require('../models/user')

//front end should delete access token
app.get('/logout',async(req,res)=>{
    try{
const cookies=req.cookies;
if(!cookies?.jwt)return res.sendStatus(204)
const refreshToken=cookies.jwt;

const user= await User.find({refreshToken}).exec()

if( !user){
res.clearCookie('jwt',{httpOnly:true})
//clear cookie
//console.log("cookie removed");
return res.sendStatus(204)
    }
//delete refreshToken in users DB

user[0].refreshToken=""

 //console.log("first user token",user[0].refreshToken);
await user.save
////console.log(logoutUser);
res.clearCookie('jwt',{httpOnly:true})
//console.log("cookies deleted,logged out");
  res.json({
    code:204,
    "user":user,
    msg:"logged out successfully"

  })//set secure to true when using in production



}
    catch(err){
res.status(500).send(err)
console.log(err);
    }
})

module.exports=app