const mongoose=require('mongoose')
const Schema=mongoose.Schema
const likeCommentSchema= mongoose.Schema({
    user:{
type:Schema.Types.ObjectId,ref:"user"
    },
post:{
    type:Schema.Types.ObjectId,ref:"post"
}

})


const LikePost=mongoose.model('likePost',likeCommentSchema)