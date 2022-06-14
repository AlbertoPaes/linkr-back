import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import router from './routers/index.js';

const server = express();

server.use(json());
server.use(cors());

server.use(router);

// Teste de primeiro commit

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(chalk.bold.green(`Listening on ${PORT}`));
});