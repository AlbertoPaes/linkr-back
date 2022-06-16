import { Router } from "express";
import usersRouter from "./usersRouter.js";
import authRouter from './authRouter.js';
import timelineRouter from './timelineRouter.js'

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(timelineRouter);

export default router;