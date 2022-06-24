import chalk from "chalk"

import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

export async function getHashtagPosts(req, res) {
  const { hashtag } = req.params;
  const hashtagPosts = []
  const { page } = req.query;

  try {
    const { rows: getByHashtag } = await hashtagsRepository.getByHashtag(hashtag, page * 1);

    for (let post of getByHashtag) {
      try {
        const urlMeta = await hashtagsRepository.getMetadata(post.link);
        const { title: urlTitle, image: urlImage, description: urlDescription } = urlMeta;
        hashtagPosts.push({ ...post, urlTitle, urlImage, urlDescription });
      } catch (e) {
        const urlMeta = { title: "", image: "", description: "" }
        const { title: urlTitle, image: urlImage, description: urlDescription } = urlMeta;
        hashtagPosts.push({ ...post, urlTitle, urlImage, urlDescription });
      }
    }

    res.status(200).send(hashtagPosts);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function getHashtags(req, res) {
  try {
    const { rows: hashtags } = await hashtagsRepository.getHashtagsByQuantity();
    res.status(200).send(hashtags);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}