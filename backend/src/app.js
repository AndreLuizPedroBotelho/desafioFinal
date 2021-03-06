import 'dotenv/config';

import { Pool } from 'pg';
import * as Sentry from '@sentry/node';

import cors from 'cors';
import express from 'express';
import Youch from 'youch';

import 'express-async-errors';

import routes from './routes';

import './database';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();
    this.database();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(cors({}));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  database() {
    try {
      const pool = new Pool({
        database: 'postgres',
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: 5432,
      });

      /**
       * Check database exist
       */
      pool.query(
        `SELECT FROM pg_database WHERE datname =  '${process.env.DB_NAME}'`,
        (err, res) => {
          if (res.rowCount <= 0) {
            /**
             * Create database if not exist
             */
            pool.query(`CREATE DATABASE ${process.env.DB_NAME}`, () => {
              console.log('Database Create');
              pool.end();
            });
          } else {
            pool.end();
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
