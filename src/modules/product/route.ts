import { Router } from "express";
import * as controller from "./controller";
import { authGuard, roleGuard } from "../../middleware";

const router = Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);

router.use(authGuard, roleGuard("ADMIN"));
router.post("/", controller.createProduct);
router.patch("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

export default router;
