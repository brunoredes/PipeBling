import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import sentryConfig from './config/sentry';
import routes from './routes/routes';

import './database';
// buscar oportunidade (venda) com status === 'won':Pipedrive
// Inserir como pedido no Bling
class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(helmet());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJson();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
