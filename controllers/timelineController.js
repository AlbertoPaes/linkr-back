import chalk from "chalk"

import { timelineRepository } from "../repositories/timelineRepository.js";

export async function publishPost(req, res) {
  const { user: { id: userId } } = res.locals;
  const { link, description } = req.body;

  //TODO: TENHO Q SALVAR TODAS AS HASHTAGS DA DESCRIPTION E NAO SOMENTE UMA
  const [hashtag] = /#\w+/g.exec(description);
  const hashtagLower = hashtag.toLowerCase();

  try {
    await timelineRepository.insertPost(userId, link, description);

    const { rows: posts } = await timelineRepository.searchOnePost(userId);
    const [{ id: postId }] = posts;

    const { rows: hashtags } = await timelineRepository.searchHashtags(hashtagLower);
    const [hashtag] = hashtags;
    if (!hashtag) await timelineRepository.insertHashtag(hashtagLower);

    await timelineRepository.relatePostHashtag(postId,)


    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};