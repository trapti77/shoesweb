import express from "express";
import { paymentPage } from "../controllers/payment.controller.js";
const router = express.Router();

router.get("/paymentpage", paymentPage);

export default router;
