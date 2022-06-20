import { Router } from "express";
import { getFollows, postFollow } from "../controllers/followsController.js";

const followsRouter = Router();

// COLOCAR OS MIDDLEWARES DE VALIDAÇÃO

followsRouter.get('/follows/:id', getFollows);
followsRouter.post('/follows', postFollow);

export default followsRouter;