import { Router } from "express";
import { getUser, login, signUp } from "../controllers/user.js";
import { authMiddleware } from "../middleware.js";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user", authMiddleware, getUser);

export default router;
