// routes/authRoutes.js
import express from "express";
import { login, signup, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

//  Protected profile route
router.get("/profile", authMiddleware, getProfile);

export default router;
