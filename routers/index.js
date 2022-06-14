import { Router } from "express";
import authRouter from './authRouter.js';

import postRouter from "./timelineRouter.js";

const router = Router();
router.use(authRouter);

router.use(postRouter);

export default router;