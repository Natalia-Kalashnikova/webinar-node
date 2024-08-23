// **WEBINAR-CODE* 6

//00:46
import Joi from 'joi';

export const sendResetPasswordSchema = Joi.object({
  email: Joi.string().required().email(),
});
