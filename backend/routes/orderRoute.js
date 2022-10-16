const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router()
const { isAuthUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthUser,newOrder)

module.exports = router;