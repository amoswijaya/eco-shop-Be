import { Router } from "express";
import * as controller from "./controller";
import { authGuard, roleGuard } from "../../middleware";

const router = Router();

router.get("/", controller.getCategories);
router.get("/:id", controller.getCategoryById);

router.use(authGuard, roleGuard("ADMIN"));
router.post("/", controller.createCategory);
router.patch("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

export default router;
