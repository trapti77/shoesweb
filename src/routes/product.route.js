import express from "express";
import { productPage } from "../controllers/product.controller.js";
const router = express.Router();
router.get("/productpage", productPage);
export default router;
