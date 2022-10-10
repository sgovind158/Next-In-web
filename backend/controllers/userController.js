const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const userModel = require("../models/userModel");
const sendToken = require("../utiles/jwtToken");

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
    // sendToken(user, 201, res);
    res.status(201).json({
        success:true,
        token
    })
})


//Login User

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
      }

      const user = await userModel.findOne({email}).select("+password");

 if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
})