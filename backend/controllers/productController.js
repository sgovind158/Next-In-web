
const productModel = require("../models/productModel")

// create Product -- Admin
exports.createProduct = async(req,res,next)=>{
    const product = await productModel.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
}




// Get All Product
exports.getAllProducts =  async(req, res, next) => {
   
    const products = await productModel.find();
    res.status(200).json({
        success : true,
        products    
    })
};