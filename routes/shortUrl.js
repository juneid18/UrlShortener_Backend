import express from "express";
import { createShortUrl, customShortUrl } from "../services/shortUrl.service.js";
const router = express.Router();

// POST /api/create
router.post("/create", createShortUrl);
router.post("/custom", customShortUrl);
export default router;
