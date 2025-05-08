import { Router } from "express";

import { register, login, logout, getMe } from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = Router();

/** @route /api/auth/register */
router.post("/register", register);

/** @route /api/auth/login */
router.post("/login", login);

/** @route /api/auth/logout */
router.post("/logout", logout);

/** @route /api/auth/me */
router.get("/me", protect, getMe);

export default router;
