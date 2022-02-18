import {
  getUserProfile,
  loginUser,
  registerUser,
} from "@src/controllers/userControllers";
import express from "express";
const router = express.Router();

// api routes:  "/users/"
router.get("/login", loginUser);
router.get("/", getUserProfile);
router.post("/register", registerUser);

export default router;
