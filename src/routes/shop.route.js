import express from "express";
import { shopPage } from "../controllers/shop.controller.js";
const router = express.Router();
router.get("/shoppage", shopPage);
export default router;
