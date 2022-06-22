import { Router } from "express";
import { getFollows, postFollow, deleteFollow, searchFollows } from "../controllers/followsController.js";

const followsRouter = Router();

// COLOCAR OS MIDDLEWARES DE VALIDAÇÃO

followsRouter.get('/follows/:userId/:followId', getFollows);
followsRouter.get('/follows/search/:name/:userId', searchFollows);
followsRouter.post('/follows', postFollow);
followsRouter.delete('/follows/:userId/:followId', deleteFollow);

export default followsRouter;