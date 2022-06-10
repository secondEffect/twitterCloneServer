import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import expressvalidator from 'express-validator';
import cors from 'cors';

import authRouter from './router/auth.js';
import tweetRouter from './router/tweet.js';
import { config } from './config.js';
import { sequelize } from './db/database.js';
import { initSocket } from './connect/socket.js';

const app = express();

app.use(helmet());

app.use(morgan('tiny'));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/tweets', tweetRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  const server = app.listen(config.host.port);
  initSocket(server);
});
