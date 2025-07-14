import { Router } from "express";
import * as controller from "./controller";
import { authGuard } from "../../middleware";

const router = Router();
router.use(authGuard); // semua route butuh login

router.get("/", controller.getCart);
router.post("/", controller.addItem);
router.patch("/:id", controller.updateQty); // id = productId
router.delete("/:id", controller.removeItem);
router.delete("/", controller.clearCart);

export default router;
