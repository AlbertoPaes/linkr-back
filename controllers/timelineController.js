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
    console.log(postId);

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
  let posts = [];

  try {
    const { rows: allPosts } = await timelineRepository.searchAllPosts();

    for (let post of allPosts) {
      try {
        const urlMeta = await timelineRepository.getMetada(post.link);
        const { title: urlTitle, image: urlImage, description: urlDescription } = urlMeta;
        posts.push({ ...post, urlTitle, urlImage, urlDescription });
      } catch (e) {
        const urlMeta = { title: "", image: "", description: "" }
        const { title: urlTitle, image: urlImage, description: urlDescription } = urlMeta;
        posts.push({ ...post, urlTitle, urlImage, urlDescription });
      }

    }
    res.status(200).send(posts);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};