const jwt = require("../lib/jwt")

const authHandler = async (req,res,next)=>{
    const {token} = req.headers
    

    try{
        const payload = await jwt.verify(token)
        next()
        
    }catch(error){
        res.status(403).json({
            ok:false,
            message:"User not Authorized",
            error:error,
        })
        next(error)
    }
    
}


const userHandler = async (req,res,next)=>{

    const {token} =req.headers
    console.log("token:", token)
    const payload = await jwt.verify(token)
    console.log("payload:",payload)
    const {id} = payload
    console.log("id",id)

    const {userId} =req.params
    
    try{

        if(userId === id){
            console.log("entro al if")
        next()
        }else{
            throw new Error("Id Usuario no corresponde")
        }
    }catch(error){
        res.status(403).json({
            ok:false,
            message:"No tienes permiso de modificar un usuario distinto al tuyo",
            error:error,
        })
        next(error)
    }
}


module.exports = {authHandler,userHandler}