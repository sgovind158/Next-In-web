const mongoose = require("mongoose")

const productSchema =  mongoose.Schema({

    name :{
        type:String,
        required : [true,"please enter product name "],
        trim : true,
    },

    description :{
        type:String,
        required : [true,"please enter product Description "],
      
    },
    price :{
        type:Number,
        required : [true,"please enter product price "],
       maxLength : [8,"please can not exced 8 charater"]
    },

    ratings :{
        type:Number,
        default:0,
    },

    images :[{
       
    publicId : {
        type:String,
        required : true,
    },

     url : {
        type:String,
        required : true,
    },

    }],

    
    category :{
        type:String,
        required : [true,"please enter product category "],
      
    },

    stock:{
        type:Number,
        required : [true,"please enter product stock "],
        maxLength : [4,"please can not exceed 4 charater"],
        default:1,
      
    },

    numOfReviews:{
        type : Number,
        default:0
    },

    reviews:[{
        user: {
            type: String,
            ref: "User",
            required: true,
          },
          name : {
            type : String,
            required:true,
          },
          rating :{
            type: Number,
            required : true
          },
          comment : {
            type: String,
            required : true
          }
    }],
  


      createdAt: {
        type: Date,
        default: Date.now,
      },

})


module.exports = mongoose.model("Product", productSchema);