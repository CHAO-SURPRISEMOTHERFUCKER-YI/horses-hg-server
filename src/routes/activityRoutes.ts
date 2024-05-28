import { Router } from "express";
import { body, param } from "express-validator";
import { ActivityController } from "../controllers/ActivityController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  authenticate,
  body("activityName").notEmpty().withMessage("El nombre es olbligatorio"),
  body("available")
    .notEmpty()
    .withMessage("Las disponibilidad es olbligatorio"),
  body("description").notEmpty().withMessage("las descripción es olbligatorio"),
  body("startDate").isDate().withMessage("Formato incorrecto"),
  body("image").isString().withMessage("Revisa el formato de la imagen"),
  handleInputErrors,
  ActivityController.createActivity
);

router.get("/", ActivityController.getAllActivities);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ActivityController.getActivityById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("activityName").notEmpty().withMessage("El nombre es olbligatorio"),
  body("available")
    .notEmpty()
    .withMessage("Las disponibilidad es olbligatorio"),
    body("startDate").isDate().withMessage("Formato incorrecto"),
  body("description").notEmpty().withMessage("las descripción es olbligatorio"),
  handleInputErrors,
  ActivityController.updateActivity
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ActivityController.deleteActivity
);

export default router;
