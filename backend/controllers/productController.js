
const productModel = require("../models/productModel");
const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError")

// create Product -- Admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    const product = await productModel.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
})




// Get All Product
exports.getAllProducts = catchAsyncError(  async(req, res, next) => {
   
    const products = await productModel.find();
    res.status(200).json({
        success : true,
        products    
    })
});


// Update Product -- Admin 

exports.updateProduct =catchAsyncError( async(req,res,next)=>{
    
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
      }

    product = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});


/// Delete Product -- Admin 

exports.deleteProduct =catchAsyncError( async (req,res,next)=>{
    let product = await productModel.findById(req.params.id)

    
  
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
      }


   product =  await product.remove();

  res.status(200).json({
    success:true,
    product
})
})


// Get Product  Single detail 

exports.getProductDetails = catchAsyncError( async (req,res,next)=>{
    let product = await productModel.findById(req.params.id)


    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

  res.status(200).json({
    success:true,
    product
})
})