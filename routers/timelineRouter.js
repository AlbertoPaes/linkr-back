import { Router } from "express";

import { publishPost } from "../controllers/timelineController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import { publishPostSchema } from "../schemas/timelineSchema.js";

const postRouter = Router();

//TODO: Tem que colocar o middleware que valida o Token
postRouter.post('/timeline', schemaValidator(publishPostSchema), publishPost)

export default postRouter;