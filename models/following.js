const mongoose=require('mongoose')
const Schema=mongoose.Schema
const followingSchema= mongoose.Schema({
    user:[{
type:Schema.Types.ObjectId,ref:"user",required:true
    }]


})


const Following=mongoose.model('following',followingSchema)
module.exports=Following