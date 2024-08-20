// **SUMMARY-CODE**
// import createHttpError from "http-errors";
// import { ROLES } from "../constants/index.js";
// import { Student } from "../db/models/student.js";

// export const checkRoles = (...roles) => async (req, res, next) => {
//     const { user } = req;
//     if (!user) {
//         next(createHttpError(401));
//         return;
//     }

//     const { role } = user;
//     if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
//         next();
//         return;
//     }

//     if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
//         const { studentId } = req.params;
//         if (!studentId) {
//             next(createHttpError(403));
//             return;
//         }

//         const student = await Student.findOne({
//             _id: studentId,
//             parentId: user._id,
//         });

//         if (student) {
//             next();
//             return;
//         }
//     }

//     next(createHttpError(403));
// };

// **WEBINAR-CODE**

import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";


export const checkChildPermissions =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { studentId } = req.params;

    if (roles.includes('teacher') && user.role === 'teacher') {
      return next();
    }

    if (roles.includes('parent') && user.role === 'parent') {
      const student = await Student.findOne({
        _id: studentId,
        parentId: user._id,
      });

      if (!student) {
        return next(createHttpError(403, 'This is not you child!'));
      }

      return next();
    }

    return next(createHttpError(403, 'Forbidden'));
  };
