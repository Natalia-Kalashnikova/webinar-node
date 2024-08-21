// **WEBINAR-CODE* 5-2

import Joi from 'joi';

export const loginUserSchema = Joi.object({
  password: Joi.string().required().min(2).max(12),
  email: Joi.string().required().email(),
});
