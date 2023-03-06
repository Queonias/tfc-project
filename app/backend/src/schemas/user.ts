import Joi = require('joi');
import ILogin from '../api/interfaces/ILogin';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateImputs = (user: ILogin) => {
  if (!user.email || !user.password) return { type: 400, message: 'All fields must be filled' };
  const { error } = schema.validate(user);
  if (error) return { type: 401, message: 'Invalid email or password' };
  return { type: null, message: '' };
};

export default validateImputs;
