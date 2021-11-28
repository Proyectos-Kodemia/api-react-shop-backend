const express = require("express")
const router = express.Router()
const user = require("../usecases/users")
const {authHandler,userHandler} = require("../middlewares/authHandlers")

router.post("/",async(request,response,next)=>{
    try{
        const userData = request.body
        const userCreated = await user.create(userData)
        const {userName} =userCreated
        response.status(201).json({
            ok:true,
            message:"User Created successfully",
            payload:{
                userName,
            }
        })
    }catch(error){
        next(error)
    }

})


// A partir de este punto requiere authentication

router.use(authHandler)

// Router get : Requiere token pasa por authHandler

router.get("/:id",async(req,res,next)=>{
    const {userId} = req.params

    const userObject = await user.getById({userId})
        
        try{
            res.json({
                
                userId,
                userName:userObject.userName,
                firstName:userObject.firstName,
                lastName:userObject.lastName,

    
        })
            next()
        }catch(error){
            next(error)
        }

})

// Router patch : Requiere token pasa por authHandler y userhandler

router.patch("/:userId",userHandler, async(req,res,next)=>{
    const {userId} = request.params
    const {userName,firstName,lastName} = req.body

    try{
        const userPatch = await user.update(userId,{userName,firstName,lastName})
        res.json({
            ok:true,
            message:`User ${userId} updated succesfully`,
            payload:{
                userPatch,
            }
    
        })
        next()
    }catch(error){
        next(error)
    }
})


// Exportando router
module.exports = router
