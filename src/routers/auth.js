// **WEBINAR-CODE* 6

//00:43

import { Router } from 'express';
import { ctrWrapper } from '../middlewares/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
  logoutController,
  refreshTokenController,
  sendResetPasswordEmailController,
  resetPasswordController,
  getOAuthUrlController,
  verifyGoogleOAuthController
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginSchemaValidator.js';
import { sendResetPasswordSchema } from '../validation/sendResetPasswordEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';
import { validateGoogleOAuthSchema } from '../validation/validateGoogleOAuth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrWrapper(loginUserController),
);

authRouter.post('/refresh-token', ctrWrapper(refreshTokenController));

authRouter.post('/logout', ctrWrapper(logoutController));

authRouter.post(
  '/request-reset-password-email',
  validateBody(sendResetPasswordSchema),
  ctrWrapper(sendResetPasswordEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrWrapper(resetPasswordController),
);

authRouter.post(
  '/get-oauth-url',
  ctrWrapper(getOAuthUrlController)
);

authRouter.post(
  '/verify-google-oauth',
  validateBody(validateGoogleOAuthSchema),
  ctrWrapper(verifyGoogleOAuthController),
);


export default authRouter;
