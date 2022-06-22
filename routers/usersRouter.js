import { Router } from "express";

import { getUserName, getUserPosts, searchUsers } from "../controllers/usersController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validateToken, getUserPosts);
usersRouter.get("/profile/:id", validateToken, getUserName);
usersRouter.get("/search/:name", validateToken, searchUsers);

export default usersRouter;