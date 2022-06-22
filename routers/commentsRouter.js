import { Router } from "express";

import { commentsPost, getComments } from "../controllers/commentsController.js";

import validateToken from "../middlewares/tokenMiddleware.js";
import schemaValidator from "../middlewares/schemaMiddleware.js";
import { commentsPostSchema } from "../schemas/commentsSchema.js";

const commentsRouter = Router();

commentsRouter.post(
  '/comments/:postId',
  validateToken,
  schemaValidator(commentsPostSchema),
  commentsPost
);

commentsRouter.get('/comments/:postId', validateToken, getComments);

export default commentsRouter;