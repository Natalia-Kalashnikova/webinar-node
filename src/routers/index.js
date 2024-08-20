// **SUMMARY-CODE**

// import { Router } from 'express';
// import studentsRouter from './students.js';
// import authRouter from './auth.js';

// const router = Router();

// router.use('/students', studentsRouter);
// router.use('/auth', authRouter);

// export default router;

// **WEBINAR-CODE**

import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const rootRouter = Router();

rootRouter.use('/students', studentsRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
