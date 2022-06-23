import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js";
import modulesRePostController from '../controllers/rePostController.js';

const rePostRouter = Router();

const { getRePosts,makeRePost } = modulesRePostController;

rePostRouter.get("/rePost/:postId", validateToken, getRePosts);
rePostRouter.post("/rePost/:postId", validateToken, makeRePost);

export default rePostRouter;