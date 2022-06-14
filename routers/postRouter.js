import { Router } from "express";

import { publishPost } from "../controllers/postController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import { publishPostSchema } from "../schemas/postSchema.js";

const postRouter = Router();

//TODO: Tem que colocar o middleware que valida o Token
postRouter.post(schemaValidator(publishPostSchema), publishPost)

export default postRouter;