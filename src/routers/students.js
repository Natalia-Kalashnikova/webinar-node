// **WEBINAR-CODE* 5-2

// import { Router } from "express";
// import {
//     createStudentController,
//     deleteStudentByIdController,
//     getStudentByIdController,
//     getStudentsController,
//     patchStudentController,
//     putStudentController
// } from "../controllers/students.js";
// import { ctrWrapper } from "../middlewares/ctrlWrapper.js";
// import { isValidId } from "../middlewares/isValidId.js";
// import { validateBody } from "../middlewares/validateBody.js";
// import { createStudentSchema } from "../validation/createStudentSchema.js";
// import { updateStudentSchema } from "../validation/updateStudentSchema.js";
// import { authenticate } from "../middlewares/authenticate.js";
// import { checkChildPermissions } from "../middlewares/checkRoles.js";


// const studentsRouter = Router();

// studentsRouter.use('/:studentId', isValidId('studentId'));

// studentsRouter.use('/', authenticate);

// studentsRouter.get('/', ctrWrapper(getStudentsController));

// studentsRouter.get('/:studentId', ctrWrapper(getStudentByIdController));

// studentsRouter.post(
//     '/',
//     validateBody(createStudentSchema),
//     ctrWrapper(createStudentController)
// );

// studentsRouter.patch(
//     '/:studentId',
//     checkChildPermissions('teacher', 'parent'),
//     validateBody(updateStudentSchema),
//     ctrWrapper(patchStudentController)
// );

// studentsRouter.put(
//     '/:studentId',
//     validateBody(createStudentSchema),
//     ctrWrapper(putStudentController)
// );

// studentsRouter.delete('/:studentId', ctrWrapper(deleteStudentByIdController));


// export default studentsRouter;


// **WEBINAR-CODE* 6

import { Router } from "express";
import {
    createStudentController,
    deleteStudentByIdController,
    getStudentByIdController,
    getStudentsController,
    patchStudentController,
    putStudentController
} from "../controllers/students.js";
import { ctrWrapper } from "../middlewares/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createStudentSchema } from "../validation/createStudentSchema.js";
import { updateStudentSchema } from "../validation/updateStudentSchema.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkChildPermissions } from "../middlewares/checkRoles.js";
import { upload } from "../middlewares/upload.js";


const studentsRouter = Router();

studentsRouter.use('/:studentId', isValidId('studentId'));

studentsRouter.use('/', authenticate);

studentsRouter.get('/', ctrWrapper(getStudentsController));

studentsRouter.get('/:studentId', ctrWrapper(getStudentByIdController));

// 00:45 6-2
studentsRouter.post(
    '/',
    upload.single('avatar'),
    validateBody(createStudentSchema),
    ctrWrapper(createStudentController)
);

studentsRouter.patch(
    '/:studentId',
    checkChildPermissions('teacher', 'parent'),
    validateBody(updateStudentSchema),
    ctrWrapper(patchStudentController)
);

studentsRouter.put(
    '/:studentId',
    validateBody(createStudentSchema),
    ctrWrapper(putStudentController)
);

studentsRouter.delete('/:studentId', ctrWrapper(deleteStudentByIdController));


export default studentsRouter;
