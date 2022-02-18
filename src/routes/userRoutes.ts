import {
  getUserProfile,
  loginUser,
  registerUser,
} from "@src/controllers/userControllers";
import { protect } from "@src/middleware/authUser";
import express from "express";
const router = express.Router();

// api routes:  "/users/"
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);

export default router;
