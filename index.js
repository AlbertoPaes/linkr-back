import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import router from './routers/index.js';

const server = express();

server.use(json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(chalk.bold.green(`Listening on ${PORT}`));
});