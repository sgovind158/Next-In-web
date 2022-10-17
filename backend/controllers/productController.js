
const productModel = require("../models/productModel");
const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utiles/apifeatures");

// create Product -- Admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user.id
    const product = await productModel.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
})




// Get All Product
exports.getAllProducts = catchAsyncError(  async(req, res, next) => {
    // console.log("get all products")
    // return next(new ErrorHandler("This is my temp Error",500))
 const resultPerPage = 8;
 const productCount = await productModel.countDocuments();
    const apiFeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeatures.query;

    res.status(200).json({
        success : true,
        products   ,
       productCount
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
    product,
    productCount 
})
})


// Create New Review or Update the review

exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating, comment,productId} = req.body;

    const review = {
        user: req.user._id,
        name : req.user.name,
        rating:Number(rating),
        comment
    };

    const  product = await productModel.findById(productId)

    const isReviewd = product.reviews.find(
        (rev)=>rev.user.toString() === req.user._id.toString()
    );

    if(isReviewd){
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
              (rev.rating = rating), (rev.comment = comment);
          });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
      });
})

///Get All Reviews of a product 

exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await productModel.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler(`Product not Found`,400))

    }

    res.status(200).json({
        success : true,
        reviews: product.reviews
    });
});


//Delete Review 


exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await productModel.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler(`Product not Found`,400))

    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );

      let avg = 0;

      reviews.forEach((rev) => {
        avg += rev.rating;
      });

      let ratings = 0;

      if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / reviews.length;
      }

      const numOfReviews = reviews.length;


      await productModel.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    

    res.status(200).json({
        success : true,
        reviews: product.reviews
    });
});