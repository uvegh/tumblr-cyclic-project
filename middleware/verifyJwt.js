
const jwt=require('jsonwebtoken')
require('dotenv').config()


const verifyJWT= (req,res,next) =>{
const authHeader= req.headers['authorization']
// console.log("authorized",authHeader);
if(!authHeader?.startsWith("Bearer ")) return res.send("not authorized")

    const token=authHeader.split(' ')[1]
    console.log("this is the bearer",token);
    jwt.verify(token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
if(err){
   res.sendStatus(403)//invalid token
   console.log(err);
}
else{
    req.user=decoded.userInfo.username
    req._id=decoded.userInfo.id
    req.email=decoded.userInfo.email
    req.roles= decoded.userInfo.roles//saves token and verifies when you make a request
    next()
}
    })

}

module.exports=verifyJWT