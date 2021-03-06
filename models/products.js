const mongoose = require("mongoose")
const {Schema} = mongoose

const schema = new Schema({
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        minlength:1,
        
        
    },// like al producto si o no
    like:{
        type:Boolean,
        required:false,
        
    },// Image es una dirección url (no un archivo)
    image:{
        type:String,
        required:false,
        trim:true,
        minlength:1,
        unique:true,
    
    },
    type:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        minlength:1,
    }, // date tiene las caracteristicas de 
    price:{
        type:Number,
        required:true,
    },
    userName: {
        type: String,
    },
    idAuthor: {
        type: String,
        required:false,
    },

})

module.exports ={
    model:mongoose.model("Product",schema),
    schema,
}