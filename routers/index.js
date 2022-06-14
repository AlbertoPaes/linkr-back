import { Router } from "express";

import postRouter from "./timelineRouter.js";

const router = Router();

router.use(postRouter);

export default router;