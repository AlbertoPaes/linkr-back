import chalk from "chalk";

import { commentsRepository } from "../repositories/commentsRepository.js";

export async function commentsPost(req, res) {
  const { user: { id: userId } } = res.locals;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    await commentsRepository.publishComments(userId, postId, comment);
    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};

export async function getComments(req, res) {
  const { postId } = req.params;

  try {
    const { rows: comments } = await commentsRepository.getComentsByPostId(postId);
    res.status(200).send(comments);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};