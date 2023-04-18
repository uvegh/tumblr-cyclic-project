const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserSchema=mongoose.Schema({
username:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true},
phone:{type:String},
password:{type:String,required:true},
followers:[{type:Schema.Types.ObjectId,ref:"followers"}],
profilePic:{type:String,default:'uploads/defaultProfile.png',required:true},
following:[{type:Schema.Types.ObjectId,ref:"following"}],
post:[{type:Schema.Types.ObjectId,ref:"post"}],
roles:{
    User:{
        type:Number,
        default:2001
    },
    Editor:Number,
    Admin:Number

},
refreshToken:{type:String},
},
{timestamps:true}
)

const User=mongoose.model('user',UserSchema)
module.exports=User