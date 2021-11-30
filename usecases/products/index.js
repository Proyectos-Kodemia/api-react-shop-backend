const Product = require("../../models/products");
const encrypt = require("../../lib/crypt");
const jwt = require("../../lib/jwt");

const create=async (dataProduct,userName,idAuthor)=>{
    const {description,like,image,type,price} = dataProduct
    const product =new Product.model ({description,like,image,type,price,userName,idAuthor});
    const savedProduct=await product.save();
    return savedProduct;
};



//date= aaaa-mm-dd


const get = async (search,date) => {
    let resp
    if(search>0){
        // console.log("get user case:",search)
        // .find({ $or: [ ] })
        // {title:{ $regex:search}}
        // let regx=`/${search}/ig`
        // resp = await Post.model.find({$or:[{userName:{$regex:regx}},{title:{$regex:regx}},{tags:{$regex:regx}},{textContainer:{$regex:regx}}]}).exec();
        resp=await Product.model.find({price:search}).exec();
        
    }else if(search){
        resp = await Product.model.find({$or:[{description:{$regex:search}},{type:{$regex:search}}]}).exec();
        
        
    }else{
        resp=await Product.model.find({}).exec();
    }
    // console.log("respuesta del search",resp)
    return resp
// incluir parametros search y date
};

const getByType = async(type)=>{
    return Product.model.find({type:type}).exec();
}


const getById = async (idProduct) => {
    return await Product.model.findById(idProduct).exec();
};


const del = (productId) => {
	return Product.model.findByIdAndDelete(productId).exec()
}


const update=async(productId,productData)=>{
    const { title,image,type,price } = productData
    return await Product.model.findByIdAndUpdate(productId,{title,image,type,price}).exec()

}

module.exports ={
    create,
    get,
    getById,
    getByType,
    del,
    update,
}
