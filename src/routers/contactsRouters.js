import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import {
  getAllContactsController,
  getContactByIdController,
  getCreateContactController,
  getDeleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createValidateScheme,
  updateValidateScheme,
} from '../validation/contactsValidation.js';
import { isValidId } from '../middlewares/isValid.js';
import { authenticate } from '../middlewares/authenticate.js';

updateValidateScheme;
const router = Router();

router.use(authenticate);

router.get(
  '/contacts',

  ctrlWrapper(getAllContactsController),
);

router.get(
  '/contacts/:contactId',
  isValidId,

  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createValidateScheme),

  ctrlWrapper(getCreateContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,

  ctrlWrapper(getDeleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,

  validateBody(updateValidateScheme),
  ctrlWrapper(patchContactController),
);

export default router;
