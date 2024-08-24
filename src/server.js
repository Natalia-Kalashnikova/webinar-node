// **WEBINAR-CODE* 5-2

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
// import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';
// import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(cookieParser());

  app.use(express.json({
    limit: "1mb",
    type: ['application/json', 'application/vnd.api+json'],
  }));

  // app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(rootRouter);

  // app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
