import express from "express";
import { createShortUrl } from "../services/shortUrl.service.js";
import { getUserLinksbyId, UserLoginService, UserRegisterService } from "../services/user.service.js";
const router = express.Router();

// POST /api/login
router.post("/login", UserLoginService);
router.post("/register", UserRegisterService);
router.get("/analysis/:userId", getUserLinksbyId);
export default router;
