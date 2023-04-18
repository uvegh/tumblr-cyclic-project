const express=require('express')
const app=express.Router()
const User=require('../models/user')

const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        let extname=path.extname(file.originalname)
        cb(null,Date.now()+ extname)
    }
})
const upload=multer({
    storage:storage
})






app.put('/user/:id',upload.single('profilePic'),async(req,res)=>{

    try{
        let user= await User.findById(req.params.id).populate("followers").exec()
//console.log(user);
        if(!user) return res.json({code:404,msg:"user does not exist"})
if(req.file){
    user.profilePic=req.file.path
    //console.log(user.profilePic);
    let updateUser={...user._doc,...req.body}
    user.overwrite(updateUser)
    user.save()
    // //console.log(user);
    ////console.log("user updated");
    res.json({
        data:user,
        msg:"user updated"
    })
}
else{
    let updateUser={...user._doc,...req.body}
    user.overwrite(updateUser)
    user.save()
    // //console.log(user);
    // //console.log("user updated");
    res.json({
        data:user,
        msg:"user updated"
    })
}
    

    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
   
    
})


app.delete('/user/:id',async(req,res)=>{

    try{
        let user= await User.findById(req.params.id)
        //console.log(user);
        if(!user) return res.json({msg:"user not found",code:404})
        await User.findByIdAndDelete(req.params.id)
        res.json({
            msg:"user deleted",
            code:200
    })
}
catch(err){
    console.log(err);
    res.status(500).send(err)
}
})


 




module.exports=app