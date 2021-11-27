const logErrors = (error, request, response, next)=>{
    console.error(error)
    next(error)
}

const errorHandler = (error,request, response) =>{
    response.status(500).json({
        message:error.message,
        stack:error.stac,
    })
}

module.exports = {logErrors,errorHandler}