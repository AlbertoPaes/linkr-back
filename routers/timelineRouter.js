import { Router } from "express";

import { publishPost } from "../controllers/timelineController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { publishPostSchema } from "../schemas/timelineSchema.js";

const postRouter = Router();

//TODO: Tem que colocar o middleware que valida o Token
postRouter.post('/timeline', validateToken, schemaValidator(publishPostSchema), publishPost)

export default postRouter;