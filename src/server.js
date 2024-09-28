import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';

import routerContacts from './routers/contactsRouters.js';

import env from './utils/env.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routerContacts);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
