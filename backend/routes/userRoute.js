const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require("../controllers/userController");
const router = express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthUser,getUserDetails);
router.route("/password/update").put(isAuthUser,updatePassword);
router.route("/me/update").put(isAuthUser,updateProfile);
router.route("/admin/users").get(isAuthUser,authorizeRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthUser,authorizeRoles("admin"),getSingleUser)
      .put(isAuthUser,authorizeRoles("admin"),updateUserRole)
      .delete(isAuthUser,authorizeRoles("admin"),deleteUser)
     
module.exports = router;