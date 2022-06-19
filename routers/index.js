import { Router } from "express";

import authRouter from './authRouter.js';
import hashtagsPosts from "./hashtagsPosts.js";
import usersRouter from "./usersRouter.js";
import timelineRouter from './timelineRouter.js'
import postsRouter from "./postsRouter.js";
import likeRouter from "./likeRouter.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(timelineRouter);
router.use(hashtagsPosts);
router.use(postsRouter);
router.use(likeRouter);

export default router;