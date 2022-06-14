import { Router } from "express";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import validateToken from "../middlewares/tokenMiddleware.js"
import modulesSignUpController from "../controllers/userController.js";

const userRouter = Router();

const { signUp } = modulesSignUpController;

userRouter.post('/signup', schemaValidator(userSchema), signUp);

export default userRouter;