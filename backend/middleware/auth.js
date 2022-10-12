const userModel = require("../models/userModel");
const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
exports.isAuthUser = catchAsyncError(async(req,res,next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Plese Login to access this resource",401))
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await userModel.findById(decodeData.id)
    next()
    
})

exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
     return    next(  new ErrorHandler(
                `Role ${req.user.role} is not allowed to access this resouce`
            ))
        }

        next()
    }
}