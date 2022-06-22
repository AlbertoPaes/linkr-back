import { Router } from "express";
import validateToken from "../middlewares/tokenMiddleware.js";
import modulesRePostController from '../controllers/rePostController.js';

const rePostRouter = Router();

const { getRePosts } = modulesRePostController;

rePostRouter.get("/rePost/:postId", validateToken, getRePosts);


export default rePostRouter;