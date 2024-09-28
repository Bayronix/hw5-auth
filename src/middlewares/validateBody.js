import createHttpError from 'http-errors';

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
      console.log('validation is success');
    } catch (err) {
      const error = createHttpError(400, 'Bad Request', {
        errors: err.details,
      });
      next(error);
    }
  };

  return func;
};

export default validateBody;
