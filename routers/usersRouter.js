import { Router } from "express";
import getUserPosts from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUserPosts);

export default usersRouter;