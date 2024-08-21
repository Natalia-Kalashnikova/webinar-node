// **WEBINAR-CODE* 5-2

import Joi from "joi";


export const createStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Min string should have at least {#limit} characters',
        'string.max': 'Max string should have at max {#limit} characters',
        'any.required': '{#label} is required',
    }),
    age: Joi.number().integer().min(6).max(16).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    avgMark: Joi.number().min(2).max(12).required().messages({
        'number.base': 'Must be a number',
        'number.min': 'Min number is not achieved. {#limit} required',
        'number.max': 'Max number is not achieved. {#limit} required',

    }),
    onDuty: Joi.boolean(),
});
