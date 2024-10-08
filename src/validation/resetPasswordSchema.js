// **WEBINAR-CODE* 6

//1:23
import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().min(2).max(12),
  token: Joi.string().required(),
});
