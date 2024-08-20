// **SUMMARY-CODE**
// import { isValidObjectId } from "mongoose";
// import createHttpError from "http-errors";

// export const isValidId = (req, res, next) => {
//         const { id } = req.params;
//         if (!isValidObjectId(id)) {
//                 throw createHttpError(404, 'Not found');
//             }
//             next();
//         };


// **WEBINAR-CODE**
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";


export const isValidId = (idName='id')=>(req, res, next) => {
    const id = req.params[idName];

    if (!id) {
        throw new Error ('id in validateMongoId is not provided');
    }

    if (!isValidObjectId(id)) {
        return next(createHttpError(400, 'Invalid id'));
    }
    return next();
};
