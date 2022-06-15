import chalk from "chalk"

import { timelineRepository } from "../repositories/timelineRepository.js";

export async function publishPost(req, res) {
  const { user: { id: userId } } = res.locals;
  const { link, description } = req.body;

  let hashtags = [];
  const descriptionArr = description.split(" ");
  const pattern = /#\w+/g;

  for (let string of descriptionArr) {
    if (pattern.test(string)) {
      hashtags.push(string.toLowerCase());
    }
  };

  try {
    await timelineRepository.insertPost(userId, link, description);

    const { rows: posts } = await timelineRepository.searchOnePost(userId);
    const { id: postId } = posts[posts.length - 1];

    for (let value of hashtags) {
      const { rows: hashtags } = await timelineRepository.searchHashtags(value);
      const [hashtag] = hashtags;
      if (!hashtag) await timelineRepository.insertHashtag(value);
      const { rows: hashtagsAfter } = await timelineRepository.searchHashtags(value);
      const [hashtagAfter] = hashtagsAfter;
      await timelineRepository.relatePostHashtag(postId, hashtagAfter.id);
    }

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};

export async function getAllPosts(req, res) {

  try {
    const { rows: allPosts } = await timelineRepository.searchAllPosts();
    res.status(200).send(allPosts);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};