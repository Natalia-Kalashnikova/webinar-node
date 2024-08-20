// **WEBINAR-CODE** 5(1)

// import { Router } from 'express';
// import { registerUserController } from '../controllers/auth.js';
// import { ctrWrapper } from '../middlewares/ctrlWrapper.js';
// import {
//   loginUserController,
//   logoutController,
//   refreshTokenController,
//   registerUserController
// } from '../controllers/auth.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { loginUserSchema } from '../validation/loginSchemaValidator.js';


// const authRouter = Router();

// authRouter.post(
//   '/register',
//   validateBody(registerUserSchema),
//   ctrWrapper(registerUserController),
// );

// authRouter.post(
//   '/login',
//   validateBody(loginUserSchema),
//   ctrWrapper(loginUserController),
// );
// authRouter.post('/refresh-token', ctrWrapper(refreshTokenController));
// authRouter.post('/logout', ctrWrapper(logoutController));

// export default authRouter;

//00:30

import { Router } from 'express';
import { ctrWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrWrapper(registerUserController),
);

export default authRouter;
