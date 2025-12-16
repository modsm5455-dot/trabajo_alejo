import { Router } from "express";
import * as controller from "../controllers/bookingController";
import { validate } from "../middlewares/validate";
import { bookingSchema } from "../schemas/bookingSchema";

const router = Router();

router.get("/", controller.getAll);

router.get("/room/:id", controller.getByRoomAndDate);

router.post("/", validate(bookingSchema), controller.create);

export default router;

