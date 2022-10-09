const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const userModel = require("../models/userModel")

//Register a user 

exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name ,email,password} = req.body;
    
    const user = await userModel.create({
        name,
        email,
        password,
        avatar:{
           public_id:"this is a sample id ",
           url :"profile pic url"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success:true,
        token
    })
})