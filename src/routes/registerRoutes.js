const express = require("express");
const router = express.Router();
const {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
} = require("../controllers/registercontroller.js");

router.get("/register", showRegisterForm);
router.post("/register", registerUser);
router.get("/login", showLoginForm);
router.post("/login", loginUser);

module.exports = router;
