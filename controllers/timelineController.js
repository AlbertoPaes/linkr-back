import chalk from "chalk"

import { timelineRepository } from "../repositories/timelineRepository.js";

export async function publishPost(req, res) {
  const { userId, link, description } = req.body;
  //TODO: Pegar "userId" do midlleware de Token

  try {
    await timelineRepository.insertPost(userId, link, description);

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};