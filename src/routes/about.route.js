import express from "express";
const router = express.Router();
import { aboutPage, cartPage } from "../controllers/about.controller.js";
router.get("/aboutpage", aboutPage);
router.get("/cartpage", cartPage);
export default router;
