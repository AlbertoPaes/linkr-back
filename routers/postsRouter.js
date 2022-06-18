import { Router } from "express";

import { editPost } from "../controllers/postsController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { editPostSchema } from "../schemas/editPostSchema.js";

const postsRouter = Router();

postsRouter.put('/post/:id', validateToken, schemaValidator(editPostSchema), editPost)
postsRouter.get('/timeline', validateToken, );

export default postsRouter;