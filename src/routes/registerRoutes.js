import express from "express";
const router = express.Router();
import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  homePage,
} from "../controllers/registercontroller.js";

router.get("/register", showRegisterForm);
router.post("/register", registerUser);
router.get("/login", showLoginForm);
router.post("/login", loginUser);
router.get("/homepage", homePage);

export default router;
