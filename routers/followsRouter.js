import { Router } from "express";
import { getFollows, postFollow, deleteFollow } from "../controllers/followsController.js";

const followsRouter = Router();

// COLOCAR OS MIDDLEWARES DE VALIDAÇÃO

followsRouter.get('/follows/:userId/:followId', getFollows);
followsRouter.post('/follows', postFollow);
followsRouter.delete('/follows/:userId/:followId', deleteFollow);

export default followsRouter;