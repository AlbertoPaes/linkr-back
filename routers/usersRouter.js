import { Router } from "express";
import { getUserPosts, searchUsers } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUserPosts);
usersRouter.get("/search/:name", searchUsers);

export default usersRouter;