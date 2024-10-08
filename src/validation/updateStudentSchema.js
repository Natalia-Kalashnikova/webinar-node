// **WEBINAR-CODE* 5-2

import Joi from "joi";


export const updateStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30).messages({
    }),
    age: Joi.number().integer().min(6).max(16),
    gender: Joi.string().valid('male', 'female', 'other'),
    avgMark: Joi.number().min(2).max(12),
    onDuty: Joi.boolean(),
});
