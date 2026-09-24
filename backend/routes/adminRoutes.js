const express = require("express");

const {
  loginAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/adminController");

const router = express.Router();

/* =========================================
   ADMIN LOGIN
========================================= */

router.post(
  "/login",
  loginAdmin
);

/* =========================================
   FORGOT PASSWORD
========================================= */

router.post(
  "/forgot-password",
  forgotPassword
);

/* =========================================
   RESET PASSWORD
========================================= */

router.post(
  "/reset-password/:token",
  resetPassword
);

module.exports = router;