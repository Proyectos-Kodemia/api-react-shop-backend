const usersRouter = require("./usersRouter")
const productsRouter = require("./productsRouter")
const authRouter = require("./authRouter")



const apiRouter = (app)=>{
    app.use("/users", usersRouter)
    app.use("/products",productsRouter)
    app.use("/auth",authRouter)
}

module.exports = apiRouter