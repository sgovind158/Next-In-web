// create Token and saving in cookie 

const sendToken = (user,statuscode,res)=>{
    // console.log(user,"my user password")
    const token = user.getJWTToken();
    // console.log(token,"my token password")
    // options for cookie 

    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
console.log(options)
    res.status(statuscode).cookie("token",token,options).json({
        success : true,
        user,
        token,
    })
}


module.exports = sendToken;