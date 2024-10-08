import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  console.log(req.body);
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(404, 'Not valid id');
  }

  next();
};
