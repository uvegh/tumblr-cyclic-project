const express = require('express')
const app = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/verifyJwt')







app.post('/signup', async (req, res) => {




    try {



        const { username, password } = req.body
//console.log(req.body);
        const duplicate = await User.findOne({"username":username}).exec()
        //console.log("duplicate is ", duplicate);
        if (duplicate ) return res.json({ code: 400, msg: "user alreaady exist" }) // res.sendStatus(409)//conflict

        //encrypt the password
        const hashPsswd = await bcrypt.hash(password, 10)//adding salt to psswd to protect psswd if data base is compromised
        // //console.log(hashPsswd);
        let newUser = { ...req.body, password: hashPsswd }
        // //console.log(newUser);
        let user = new User(newUser)
        await user.save()
        //console.log(user);
        res.json({
            msg: "user added successfully",
            code: 200,
            data: user
        })
    }



    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }








})




app.post('/login', async (req, res) => {

    try {
        //console.log(req.body);
        const { username, password } = req.body
        //console.log(req.body);
        let user = await User.findOne({ username: req.body.username }).exec()
        //console.log("user is ", user);
        if (!user) return res.json({ msg: "user doesnt exist", code: 404 })
        ////console.log(user.password);

        const matchPsswd = await bcrypt.compare(password, user.password)

        ////console.log(matchPsswd);
        if (matchPsswd) {
            const roles=Object.values(user.roles).filter(Boolean)
            const id=user._id
            //console.log("role is",roles);
            const accessToken = jwt.sign(
               {
                 "userInfo":{  
                    "id":user._id,   
                       "username": user.username ,
                "roles":roles
            }}
        ,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            )

            const refreshToken = jwt.sign({ "username": user.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            //save refresh token with user document on login
user.refreshToken=refreshToken;
 await user.save()
//  //console.log("updated user is",updatedUser);

            res.cookie('jwt', refreshToken, { httpOnly: true,sameSite:'none', maxAge: 24 * 60 * 60 * 1000 })//create cookie and it canonly be sent through http and not available to javascript,send refresh token as a cookie

            res.json({
                data: user,
                auth: true,
                 accessToken,
                 id,
                 username,
                 roles,
                code: 200,
                sucess: `${user}logged in`
            })
          
        }
        else {
            res.sendStatus(401)//unauthorized

        }




    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }


})


// app.delete('/logout')

module.exports = app
