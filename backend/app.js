const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
var cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
//Route imports

const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")

app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)

//middleware for errors
app.use(errorMiddleware)


module.exports = app
