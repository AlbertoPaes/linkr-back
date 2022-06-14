import chalk from "chalk"

import { postRepository } from "../repositories/postRepository.js";

export async function publishPost(req, res) {
  const { userId, link, descriptions } = req.body;
  //TODO: Pegar "userId" do midlleware de Token

  try {
    await postRepository.insertPost(userId, link, descriptions);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
};