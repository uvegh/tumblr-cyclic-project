const mongoose=require('mongoose')
const Schema=mongoose.Schema
const followerSchema= mongoose.Schema({
    user:[{
type:Schema.Types.ObjectId,ref:"user",required:true
    }]


})


const Followers=mongoose.model('followers',followerSchema)
module.exports=Followers