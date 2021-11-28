const Product = require("../../models/products");
const encrypt = require("../../lib/crypt");
const jwt = require("../../lib/jwt");

const create=async (dataProduct,userName,idAuthor)=>{
    const {title,like,image,type,price} = dataProduct
    const product =new Product.model ({title,like,image,type,price,userName,idAuthor});
    const savedProduct=await product.save();
    return savedProduct;
};



//date= aaaa-mm-dd


const get = async (search,date) => {
    let resp
    if(search){
        // console.log("get user case:",search)
        // .find({ $or: [ ] })
        // {title:{ $regex:search}}
        // let regx=`/${search}/ig`
        // resp = await Post.model.find({$or:[{userName:{$regex:regx}},{title:{$regex:regx}},{tags:{$regex:regx}},{textContainer:{$regex:regx}}]}).exec();
        resp = await Product.model.find({$or:[{userName:{$regex:search}},{title:{$regex:search}},{tags:{$regex:search}},{textContainer:{$regex:search}}]}).exec();
    }else if(date){
        
        const dateInit = new Date(date)
        const dateLast = dateInit.setMinutes(dateInit.getMinutes()+1440)
        console.log("datelast",dateLast)
        resp=await Product.model.find({dateCreation:{ $gte: date, $lte: dateLast }}).exec();
        
    }else{
        resp=await Product.model.find({}).exec();
    }
    // console.log("respuesta del search",resp)
    return resp
// incluir parametros search y date
};

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
    del,
    update,
}
