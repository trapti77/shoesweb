import express from "express";
import { searchBar } from "../controllers/search.controller.js";
const router = express.Router();
router.get("/searchbar", searchBar);
export default router;
