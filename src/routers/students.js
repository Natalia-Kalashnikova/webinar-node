// **SUMMARY-CODE**

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
// import { validateBody } from "../middlewares/validateBody.js";
// import { createStudentSchema, updateStudentSchema } from "../validation/students.js";
// import { isValidId } from "../middlewares/isValidId.js";
// import { authenticate } from "../middlewares/authenticate.js";
// import { checkRoles } from "../middlewares/checkRoles.js";
// import { ROLES } from "../constants/index.js";


// const studentsRouter = Router();

// studentsRouter.get(
//     '/',
//     checkRoles(ROLES.TEACHER),
//     ctrWrapper(getStudentsController));

// studentsRouter.get(
//     '/:studentId',
//     checkRoles(ROLES.TEACHER, ROLES.PARENT),
//     isValidId,
//     ctrWrapper(getStudentByIdController)
// );

// studentsRouter.post(
//     '/register',
//     checkRoles(ROLES.TEACHER),
//     validateBody(createStudentSchema),
//     ctrWrapper(createStudentController)
// );

// studentsRouter.delete(
//     '/:studentId',
//     checkRoles(ROLES.TEACHER),
//     isValidId,
//     ctrWrapper(deleteStudentByIdController)
// );

// studentsRouter.put(
//     '/:studentId',
//     checkRoles(ROLES.TEACHER),
//     isValidId,
//     validateBody(createStudentSchema),
//     ctrWrapper(putStudentController)
// );

// studentsRouter.patch(
//     '/:studentId',
//     checkRoles(ROLES.TEACHER),
//     isValidId,
//     validateBody(updateStudentSchema),
//     ctrWrapper(patchStudentController)
// );

// studentsRouter.use(authenticate);

// studentsRouter.get('/', ctrWrapper(getStudentsController));


// export default studentsRouter;


// **WEBINAR-CODE**

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


// const studentsRouter = Router();

// studentsRouter.use('/students/:studentId', isValidId('studentId'));

// studentsRouter.get('/students', ctrWrapper(getStudentsController));

// studentsRouter.get('/students/:studentId', ctrWrapper(getStudentByIdController));

// studentsRouter.post('/students', validateBody(createStudentSchema), ctrWrapper(createStudentController));

// studentsRouter.patch('/students/:studentId', validateBody(updateStudentSchema), ctrWrapper(patchStudentController));

// studentsRouter.put('/students/:studentId', validateBody(createStudentSchema), ctrWrapper(putStudentController));

// studentsRouter.delete('/students/:studentId', ctrWrapper(deleteStudentByIdController));


// export default studentsRouter;

// **WEBINAR-CODE**-2

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


const studentsRouter = Router();

studentsRouter.use('/:studentId', isValidId('studentId'));

studentsRouter.use('/', authenticate);

studentsRouter.get('/', ctrWrapper(getStudentsController));

studentsRouter.get('/:studentId', ctrWrapper(getStudentByIdController));

studentsRouter.post('/', validateBody(createStudentSchema), ctrWrapper(createStudentController));

studentsRouter.patch('/:studentId', checkChildPermissions('teacher', 'parent'), validateBody(updateStudentSchema), ctrWrapper(patchStudentController));

studentsRouter.put('/:studentId', validateBody(createStudentSchema), ctrWrapper(putStudentController));

studentsRouter.delete('/:studentId', ctrWrapper(deleteStudentByIdController));


export default studentsRouter;
