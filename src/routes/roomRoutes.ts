import { Router } from "express";
import * as controller from "../controllers/roomController";
import { validate } from "../middlewares/validate";
import { roomSchema } from "../schemas/roomSchema";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(roomSchema), controller.create);
router.put("/:id", validate(roomSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
