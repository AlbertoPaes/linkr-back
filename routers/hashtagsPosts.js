import { Router } from "express";

import { getHashtagPosts } from "../controllers/hashtagsController.js";

import validateToken from "../middlewares/tokenMiddleware.js";

const hashtagsPosts = Router();

hashtagsPosts.get('/hashtag/:hashtag', validateToken, getHashtagPosts);

export default hashtagsPosts;