const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : [true,"Please Enter Your Name "],
        maxLength : [30,"Name cannot exced 30 charater"],
        minLength:[4,"Name should have more then 4 charater"]
    },
    email:{
        type : String,
        required:[true,"Please Enter Your Email"],
        unique :true,
        validate : [validator.isEmail,"Please Enter valid email"]
    },
    password :{
        type : String,
        required : [true,"Please Enter Your Password "],
      
        minLength:[8,"Name should have more then 4 charater"],
        select : false
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role:{
        type:String,
        default:"user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

      resetPasswordToken: String,
  resetPasswordExpire: Date,
})


module.exports = mongoose.model("User", userSchema);