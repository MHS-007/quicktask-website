const express = require("express");
const router = express.Router();

// Controllers (we'll create them next)
const { registerUser, loginUser } = require("../controllers/authController");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
