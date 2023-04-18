const express=require('express')
const app= express.Router()
const refreshTokenController=require('../controller/refreshTokenController')

app.get('/',refreshTokenController)

module.exports=app