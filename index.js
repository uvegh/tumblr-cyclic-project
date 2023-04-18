require('dotenv').config()
const express=require('express')

const app=express()
const path=require('path')
const cors =require('cors')
const mongoose=require('mongoose')
const auth=require('./routes/auth')
const getPosts=require('./routes/getPost')
const createPost=require('./routes/createPost')
const getUsers=require('./routes/getUsers')
const logout=require('./routes/logout')
const newComment=require('./routes/newComment')
const getComments=require('./routes/getComment')
const cookieParser=require('cookie-parser')
const reply= require('./routes/reply')
const getUserPosts=require('./routes/getUserPosts')
const getSinglePost=require('./routes/getSinglePost')
const updatePost=require('./routes/updatePost')
const likepost=require('./routes/likePost')
const followers=require('./routes/followers')
const updateUser=require('./routes/updateUser')
const session = require('express-session')
const multer=require('multer')
const PORT=process.env.PORT||3001
const CON_STR="mongodb://localhost:27017/blog"
const jwt=require('jsonwebtoken')

const User = require('./models/user')
const rolesList=require('./config/rolesList')
// const verifyJWT=require('./middleware/verifyJwt')
const config={useNewUrlParser:true,useUnifiedTopology:true}
const connectDb= async()=>{
    try{
       const conn= await  mongoose.connect(process.env.MONGO_URL,config)
          console.log("db connected ",conn.connection.host)
        //   mongoose.connection.on('open',()=>{
        //     console.log('server connected');
        // })
        app.listen(process.env.PORT||port,()=>console.log("server running on ",port))
      }
      catch(err){
          console.log(err);
          process.exit(1)
// mongoose.connection.on('close',(err)=>{
//     console.log(err);
// })
      }
      
}


app.use(express.static(path.join(__dirname,'public')))

mongoose.set('strictQuery',false)//remove warnings from console
//0hmcGW7VMWHy7cm5


app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({extended:true,limit:'100mb'}))
app.use(cors())
//middle ware for cookies
app.use(cookieParser())






app.use('/uploads',express.static('uploads'))
app.use('/',auth)
app.use('/refresh',require('./routes/refresh'))
app.use('/',getPosts)
app.use('/',getUserPosts)
app.use('/',getSinglePost)
app.use('/',getUsers)
app.use('/',logout)
app.use('/',createPost)
app.use('/',newComment)
app.use('/',getComments)
app.use('/',updatePost)
app.use('/',likepost)
app.use('/',reply)
app.use('/',followers)
app.use('/',updateUser)

connectDb.then(()=>{
    app.listen(PORT,()=>{
        console.log("listening for requests");
    })
})