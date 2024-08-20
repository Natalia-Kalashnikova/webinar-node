// **WEBINAR-CODE** 4(2)
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

// studentsRouter.patch('/students/:studentId',
//     validateBody(updateStudentSchema),
//     ctrWrapper(patchStudentController));

// studentsRouter.put('/students/:studentId', validateBody(createStudentSchema), ctrWrapper(putStudentController));

// studentsRouter.delete('/students/:studentId', ctrWrapper(deleteStudentByIdController));


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
// import { authenticate } from "../middlewares/authenticate.js";
// import { checkChildPermissions } from "../middlewares/checkRoles.js";


// const studentsRouter = Router();

// studentsRouter.use('/:studentId', isValidId('studentId'));

// studentsRouter.use('/', authenticate);

// studentsRouter.get('/', ctrWrapper(getStudentsController));

// studentsRouter.get('/:studentId', ctrWrapper(getStudentByIdController));

// studentsRouter.post('/', validateBody(createStudentSchema), ctrWrapper(createStudentController));

// studentsRouter.patch('/:studentId', checkChildPermissions('teacher', 'parent'), validateBody(updateStudentSchema), ctrWrapper(patchStudentController));

// studentsRouter.put('/:studentId', validateBody(createStudentSchema), ctrWrapper(putStudentController));

// studentsRouter.delete('/:studentId', ctrWrapper(deleteStudentByIdController));


// export default studentsRouter;


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


const studentsRouter = Router();

studentsRouter.use('/:studentId', isValidId('studentId'));

studentsRouter.get('/', ctrWrapper(getStudentsController));

studentsRouter.get('/:studentId', ctrWrapper(getStudentByIdController));

studentsRouter.post('/', validateBody(createStudentSchema), ctrWrapper(createStudentController));

studentsRouter.patch('/:studentId',
    validateBody(updateStudentSchema),
    ctrWrapper(patchStudentController));

studentsRouter.put('/:studentId', validateBody(createStudentSchema), ctrWrapper(putStudentController));

studentsRouter.delete('/:studentId', ctrWrapper(deleteStudentByIdController));


export default studentsRouter;
