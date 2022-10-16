const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//create new order 

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await orderModel.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt:Date.now(), user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order,
      });
})

// get Single Order

exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{

    const order = await orderModel.findById(req.params.id).populate(
        "user",
        "name email"
      );
   

  
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });


})


// get logged in user  Orders



exports.myOrders = catchAsyncError(async (req,res,next)=>{
    const orders = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });


})



// get all Orders  -- Admin



exports.getAllOrdersAdmin = catchAsyncError(async (req,res,next)=>{
    const orders = await orderModel.find();

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })
  res.status(200).json({
    success: true,
    orders,
    totalAmount
  });


})


//update Order Status --Admin

exports.updateOrder = catchAsyncError(async (req,res,next)=>{
    const order = await orderModel.findById(req.params.id)


    
    if(!order){
        next(new ErrorHandler("Order not found with this id ",404))
    }
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deleveredAt = Date.now();
    }


    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success: true,
    })
})

// update stock fun

async function updateStock(id,quantity){
    const product = await productModel.findById(id);



    product.stock -= quantity;
    await product.save({validateBeforeSave:false})
}

// deleteOrder --Admin

exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);

    if(!order){
        next(new ErrorHandler("Order not found with this id ",404))
    }

    await order.remove();

    res.status(200).json({
        success: true
    })
})