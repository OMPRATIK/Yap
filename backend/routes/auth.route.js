import { Router } from "express";
const router = Router();

import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import hashPassword from "../middlewares/hashPassword.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

router.post("/signup", hashPassword, signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", authorize, updateProfile);
router.get("/check", authorize, checkAuth);
export default router;
