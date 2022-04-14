const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");

const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");
const { rateLimiter } = require("../controllers/rateLimiter");

// LOG IN
router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, rateLimiter(60, 5), attemptLogin);

// SIGN UP
router.post("/register", validateForm, rateLimiter(60, 3), attemptRegister);

module.exports = router;
