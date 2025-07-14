import { Router } from "express";
import * as controller from "./controller";
import { authGuard } from "../../middleware";

const router = Router();
router.use(authGuard);

router.get("/", controller.getWishlist);
router.post("/", controller.addItem);
router.delete("/:id", controller.removeItem);

export default router;
