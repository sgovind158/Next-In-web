const express = require("express");
const { getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthUser, getAllProducts);
router.route("/admin/product/new").post(isAuthUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthUser,authorizeRoles("admin"),updateProduct)
router.route("/admin/product/:id").delete(isAuthUser,authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails)
module.exports = router