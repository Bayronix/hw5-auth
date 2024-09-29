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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
updateValidateScheme;
const router = Router();

router.use(authenticate);

router.get(
  '/contacts',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getAllContactsController),
);

router.get(
  '/contacts/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createValidateScheme),
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getCreateContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getDeleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(updateValidateScheme),
  ctrlWrapper(patchContactController),
);

export default router;
