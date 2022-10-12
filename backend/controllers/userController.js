const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const userModel = require("../models/userModel");
const sendToken = require("../utiles/jwtToken");
const sendEmail = require("../utiles/sendEmail");

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


//Logout User 

exports.logout = catchAsyncError(async(req,res,next)=>{
  console.log(res)
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
})



//Forgot Password

exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
  const user = await userModel.findOne({email: req.body.email})

  if(!user){
    return next(new ErrorHandler("User not found",404))
  }

  //Get Reset Password Token
  resetToken = user.getResetPasswordToken();
  // console.log(resetToken)
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;


  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
})


// Reset Password

exports.resetPassword = catchAsyncError(async(req,res,next)=>{
  //  creating token hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},

  })

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }


  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
})


///Get User Detail 

exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success:true,
    user,
  })
})


///update User Password 

exports.updatePassword = catchAsyncError(async(req,res, next)=>{
  const user = await userModel.findById(req.user.id).select("+password");
  
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incoorect",400))
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not matched ",400))
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user,200,res)
})


/// update User Profile 

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name : req.body.name,
    email : req.body.email
  }

  // We will add cloudinary later 

  const user = await userModel.findByIdAndUpdate(req.user.id,newUserData,{
    new : true,
    runValidators : true,
    userFindAndModify : false,
  })

  res.status(200).json({
    success : true,
  })
})

// Get all users(admin)

exports.getAllUser = catchAsyncError(async (req,res,next)=>{
  const users = await userModel.find();

  res.status(200).json({
    success: true,
    users,
  })
});

// Get Single User (admin)

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
  const user = await userModel.findById(req.params.id)
  if(!user){
    next(new ErrorHandler(`User does not exit with id : ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    user
  });
});



/// update User Role --Admin

exports.updateUserRole = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name : req.body.name,
    email : req.body.email,
    role : req.body.role,
  }

  // We will add cloudinary later 

  const user = await userModel.findByIdAndUpdate(req.params.id,newUserData,{
    new : true,
    runValidators : true,
    userFindAndModify : false,
  })

  res.status(200).json({
    success : true,
  })
})

//Delete User --Admin 

exports.deleteUser = catchAsyncError(async (req,res,next)=>{
  const user = await userModel.findById(req.params.id);

  if(!user){
    return  next( new ErrorHandler(`User does not exit in this id : ${req.params.id}`))
    
  }

  await user.remove();

  res.status(200).json({
    success : true,
    message:"User delete successfully"
  })
})
