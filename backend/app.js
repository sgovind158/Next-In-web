const express = require("express");
const app = express();

app.use(express.json())

//Route imports

const productRoute = require("./routes/productRoute")

app.use("api/v1",productRoute)
module.exports = app