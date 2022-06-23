import { Router } from "express";

import { getFollows, postFollow, deleteFollow, searchFollows } from "../controllers/followsController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const followsRouter = Router();

followsRouter.get('/follows/:userId/:followId', validateToken, getFollows);
followsRouter.get('/follows/search/:name/:userId', validateToken, searchFollows);
followsRouter.post('/follows', validateToken, postFollow);
followsRouter.delete('/follows/:userId/:followId', validateToken, deleteFollow);

export default followsRouter;