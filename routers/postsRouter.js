import { Router } from "express";

import { deletePost, editPost } from "../controllers/postsController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { editPostSchema } from "../schemas/editPostSchema.js";

const postsRouter = Router();

postsRouter.put('/post/:id', validateToken, schemaValidator(editPostSchema), editPost);
postsRouter.delete('/post/:id', validateToken, deletePost);

export default postsRouter;