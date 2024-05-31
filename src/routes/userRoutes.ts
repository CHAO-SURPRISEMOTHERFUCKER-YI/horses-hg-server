import { Router } from "express";
import { body, param } from "express-validator";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los passwords no son iguales");
    }
    return true;
  }),
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  UserController.createUser
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El token no puede ir vacío"),
  handleInputErrors,
  UserController.confirmAccount
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email no válido"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  handleInputErrors,
  UserController.login
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  UserController.requestCode
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  UserController.forgotPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("El token no puede ir vacío"),
  handleInputErrors,
  UserController.validateToken
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("Token no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los passwords no son iguales");
    }
    return true;
  }),
  handleInputErrors,
  UserController.updatePasswordToken
);

router.get("/user", authenticate, UserController.user);
export default router;

router.put(
  "/profile",
  authenticate,
  body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  UserController.updateProfile
);

router.post(
  "/update-password",
  authenticate,
  body("current_password")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los passwords no son iguales");
    }
    return true;
  }),
  handleInputErrors,
  UserController.updateCurrentPassword
);
