import { Router } from "express";

import { getHashtagPosts, getHashtags } from "../controllers/hashtagsController.js";

import validateToken from "../middlewares/tokenMiddleware.js";

const hashtagsPosts = Router();

hashtagsPosts.get('/hashtag/:hashtag', validateToken, getHashtagPosts);
hashtagsPosts.get('/hashtag', validateToken, getHashtags);

export default hashtagsPosts;