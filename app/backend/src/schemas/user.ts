import Joi = require('joi');
import ILogin from '../api/interfaces/ILogin';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateImputs = (user: ILogin) => {
  const { error } = schema.validate(user);
  if (error) return { type: 400, message: 'All fields must be filled' };
  return { type: null, message: '' };
};

export default validateImputs;
