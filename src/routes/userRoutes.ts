import { Router } from "express";
import * as controller from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { userSchema } from "../schemas/userSchema";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(userSchema), controller.create);
router.delete("/:id", controller.remove);

export default router;
