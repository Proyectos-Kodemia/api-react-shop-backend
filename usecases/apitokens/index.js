const bcrypt = require("bcrypt")
const User = require("../../models/users").model
const encrypt = require("../../lib/crypt")
const jwt = require("../../lib/jwt")


const create = async(userData) =>{
    const {firstName,lastName,userName,email,password,role} = userData

    const hashpass = async(password)=>{
        return await bcrypt.hash(password.toString(),10)
    }
    const passEncry = await hashpass(password)

    const user = new User({firstName, lastName, userName, email,password:passEncry,role})

    const savedUser = await user.save()

    return savedUser

}

// Obtener Usuario por UserName
const getByUserName = async(userName)=>{
    return await User.findOne(userName)
    
}
// Obtener Usuario por Id
const getById = async(userId)=>{
    return await User.findOne(userId)
    
}

// Proceso LogIn de usuarios
const logIn = async(userName,password)=>{
    const userObject = await getByUserName({userName})
    const hash = userObject.password
    const isValid = await encrypt.verifyPassword(password,hash)

    if(isValid){
        const payload = {
            "id":userObject._id,
            "role":userObject.rol
        }
        console.log(payload)
        const token = await jwt.sign(payload)
        return token
    }else{
        error()
    }
    
    

}

// Actualizar users
const update = (userId,userData) =>{
    const {userName,firstName,lastName} = userData
    return User.findByIdAndUpdate(userId,{userName,firstName,lastName}).exec()
}

// Exporting functions

module.exports = {
    create,
    getByUserName,
    getById,
    logIn,
    update,
}
