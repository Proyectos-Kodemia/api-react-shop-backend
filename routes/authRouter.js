const express = require("express")
const router = express.Router()
const user = require("../usecases/users")


router.post("/",async(req,res,next)=>{
    const {userName,password} = req.body

    try{
        const token = await user.logIn(userName,password)
        res.status(200).json({
            ok:true,
            message:"Log in Succesful",
            token:token,
        })
    }catch(error){
        res.status(401).json({
            ok:false,
            message: "Autentication Failed, Password or User name invalid"

        })
        next(error)
    }


})

// Exportando router
module.exports = router;
