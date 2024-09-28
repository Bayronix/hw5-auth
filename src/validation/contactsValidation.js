import Joi from 'joi';

export const createValidateScheme = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': '"Name" should be a text',
    'string.empty': '"Name" cannot be empty',
    'string.min': '"Name" should have at least 3 characters',
    'string.max': '"Name" should not exceed 30 characters',
    'any.required': '"Name" is a required field',
  }),

  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"Phone number" must be a valid number with 10-15 digits, optionally starting with a +',
      'string.empty': '"Phone number" cannot be empty',
      'any.required': '"Phone number" is a required field',
    }),

  email: Joi.string().email().optional().messages({
    'string.email': '"Email" must be a valid email address',
  }),

  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': '"isFavourite" must be a boolean value',
  }),

  contactType: Joi.string().valid('personal', 'home').required().messages({
    'any.only': '"Contact Type" must be either "personal" or "home"',
    'any.required': '"Contact Type" is a required field',
  }),
});

export const updateValidateScheme = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': '"Name" should be a text',
    'string.min': '"Name" should have at least 3 characters',
    'string.max': '"Name" should not exceed 30 characters',
  }),

  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .optional()
    .messages({
      'string.pattern.base':
        '"Phone number" must be a valid number with 10-15 digits, optionally starting with a +',
    }),

  email: Joi.string().email().optional().messages({
    'string.email': '"Email" must be a valid email address',
  }),

  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': '"isFavourite" must be a boolean value',
  }),

  contactType: Joi.string().valid('personal', 'home').optional().messages({
    'any.only': '"Contact Type" must be either "personal" or "home"',
  }),
});
