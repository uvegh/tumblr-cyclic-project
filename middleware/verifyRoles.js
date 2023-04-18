const verifyRoles=(...allowedRoles)=>{
    return(req,res,next)=>{

        if(!req?.roles) return res.sendStatus(401)
        const rolesArray=[...allowedRoles]
        console.log(rolesArray);
        console.log(req.roles);

        //check through roles sent from the jwt with the role the user is assigned through the route if it is true 
        const result=req.roles.map(role=>rolesArray.includes(role)).find(val=>val===true)//find if one is true
        if(!result) return res.sendStatus(401)
        next()
    }
}

module.exports=verifyRoles