import { Router } from "express";

import { getAllPosts, getAllPostsByFollows, publishPost } from "../controllers/timelineController.js";

import schemaValidator from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { publishPostSchema } from "../schemas/timelineSchema.js";

const postRouter = Router();

postRouter.post('/timeline', validateToken, schemaValidator(publishPostSchema), publishPost)
postRouter.get('/timeline', validateToken, getAllPosts);
postRouter.get('/timeline/:userId', validateToken, getAllPostsByFollows)

export default postRouter;