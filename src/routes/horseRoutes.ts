import { Router } from "express";
import { body, param } from "express-validator";
import { HorseController } from "../controllers/HorseController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  authenticate,
  body("horseName").notEmpty().withMessage("El nombre es olbligatorio"),
  body("available")
    .notEmpty()
    .withMessage("Las disponibilidad es olbligatorio"),
  body("description").notEmpty().withMessage("las descripción es olbligatorio"),
  body("image").isString().withMessage("Revisa el formato de la imagen"),
  handleInputErrors,
  HorseController.createHorse
);

router.get("/", HorseController.getAllHorses);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  HorseController.getHorseById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("horseName").notEmpty().withMessage("El nombre es olbligatorio"),
  body("available")
    .notEmpty()
    .withMessage("Las disponibilidad es olbligatorio"),
  body("description").notEmpty().withMessage("las descripción es olbligatorio"),
  handleInputErrors,
  HorseController.updateHorse
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  HorseController.deleteHorse
);

export default router;
