import express from "express";
const router = express.Router();
import { aboutPage } from "../controllers/about.controller.js";
router.get("/aboutpage", aboutPage);
export default router;
