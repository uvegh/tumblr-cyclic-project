require('dotenv').config
const jwt = require('jsonwebtoken')


const handleRefreshToken = (req, res) => {
   
    const User = require('../models/user')
    try {
        const cookies = req.cookies
        //if cookies dont exist and then jwt property doesnt exist 
        if (!cookies?.jwt) return res.sendStatus(401)
        
        console.log("cookies", cookies.jwt);
        const refreshToken = cookies.jwt
        let foundUser = User.findOne({ refreshToken }).exec()
        // console.log("user token is ", foundUser);
        if (!foundUser) return res.sendStatus(403)//if it cant retrieve the already stored refresh token send forbidden

        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username)//decode the signature

                    return res.sendStatus(403);
                const roles = Object.values(foundUser.roles)
                const id=foundUser._id
                console.log("user in refresh controller",roles);
                const accessToken = jwt.sign(
                    {
                        "userInfo": {
                            "username": decoded.username,
                            "roles": roles

                           


                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }

                );
                console.log("access token",accessToken);
                res.json({  accessToken,
                roles,
            id })

            }
        )
















    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }


}

module.exports = handleRefreshToken

