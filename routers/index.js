import { Router } from "express";
import usersRouter from "./usersRouter.js";
import authRouter from './authRouter.js';

const router = Router();

router.use(authRouter);
router.use(usersRouter);

export default router;