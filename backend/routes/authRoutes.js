import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register → create shopper
router.post("/register", registerUser);

// POST /api/auth/login → login admin
router.post("/login", loginUser);

export default router;

