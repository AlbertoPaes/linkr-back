import { Router } from "express";

import authRouter from './authRouter.js';
import hashtagsPosts from "./hashtagsPosts.js";
import postRouter from "./timelineRouter.js";

const router = Router();
router.use(authRouter);

router.use(postRouter);

router.use(hashtagsPosts);

export default router;