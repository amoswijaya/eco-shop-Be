import { Router } from "express";
import { handleRegister, handleLogin } from "./controller";

const router = Router();
router.post("/register", handleRegister);
router.post("/login", handleLogin);
export default router;
