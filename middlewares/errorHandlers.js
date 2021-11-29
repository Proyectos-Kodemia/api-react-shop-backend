const logErrors = (error, request, response, next)=>{
    console.error(error)
    next(error)
}

const errorHandler = (error,request, response) =>{
    console.log("****ERROR,", error)
    response.status(500).json({
        message:error.message,
        stack:error.stack,
    })
}

module.exports = {logErrors,errorHandler}