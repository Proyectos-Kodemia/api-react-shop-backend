const jsonwebtoken = require("jsonwebtoken")

const sign = (payload)=>{
    const secret = process.env.SECRET
    return jsonwebtoken.sign(payload,secret)

}
// Regresa el objeto payload
const verify =(token)=>{
    const secret = process.env.SECRET
    return jsonwebtoken.verify(token,secret)
}

module.exports = {
    sign,
    verify,
}