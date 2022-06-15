import chalk from "chalk"

import { timelineRepository } from "../repositories/timelineRepository.js";

export async function publishPost(req, res) {
  const { user: { id } } = res.locals;
  const { link, description } = req.body;
  //TODO: Pegar "userId" do midlleware de Token

  try {
    await timelineRepository.insertPost(id, link, description);

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};