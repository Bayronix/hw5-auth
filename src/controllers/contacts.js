import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
    const filter = parseContactsFilterParams(req.query);

    const data = await contactServices.getAllContacts({
      perPage,
      page,
      sortBy,
      sortOrder,
      filter: { ...filter, userId: req.user._id },
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contactServices.getContactById(contactId, req.user._id);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Contact with id=${contactId} successfully found`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreateContactController = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user._id,
    };
    const contact = await contactServices.getCreateContact(payload);

    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactServices.updateContact(
      { _id: contactId, userId: req.user._id },
      req.body,
    );

    if (!result) {
      throw createHttpError(404, `Contact with id=${contactId} not found`);
    }

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contactServices.getDeleteContact({
      _id: contactId,
      userId: req.user._id,
    });

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getContactsController = async (req, res, next) => {
  try {
    const { perPage, page } = parsePaginationParams(req.query);

    const data = await contactServices.getAllContacts({
      perPage,
      page,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  } catch (error) {
    next(error);
  }
};
