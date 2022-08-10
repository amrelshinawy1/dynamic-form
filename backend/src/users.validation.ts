import Joi from 'joi';
import { jobTitles } from './users.interfaces';

export const validationRules = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  address1: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip: Joi.string(),
  phone: Joi.string(),
  jobTitle: Joi.string().valid(...jobTitles),
  reason: Joi.string()
});
