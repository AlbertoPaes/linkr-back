import {Router} from 'express';
import  validadeToken from '../middlewares/tokenMiddleware.js';
import modulesLikeController from '../controllers/likeController.js';

const likeRouter = Router();

const { getLikes,addOrRemoveLike } = modulesLikeController;

likeRouter.get("/likes/:postId", validadeToken, getLikes);
likeRouter.post("/likes/:postId", validadeToken, addOrRemoveLike);

export default likeRouter;