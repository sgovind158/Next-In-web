const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
app.use(express.json())

//Route imports

const productRoute = require("./routes/productRoute")

app.use("/api/v1",productRoute)

//middleware for errors
app.use(errorMiddleware)


module.exports = app
