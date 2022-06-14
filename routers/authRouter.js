import { Router } from "express";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import loginSchema from "../schemas/loginSchema.js";
import userSchema from "../schemas/userSchema.js";
import modulesAuthController from "../controllers/authController.js";

const authRouter = Router();

const { signUp,signIn } = modulesAuthController;

authRouter.post("/", schemaValidator(loginSchema), signIn);
authRouter.post("/signup", schemaValidator(userSchema), signUp);

export default authRouter;