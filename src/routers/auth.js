import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import validateBody from '../middlewares/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/usersValidation.js';

const authRouter = Router();

authRouter.post('/auth/register', ctrlWrapper(registerUserController));

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/auth/logout', ctrlWrapper(logoutUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
