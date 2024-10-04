import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find(filter).sort({
    [sortBy]: sortOrder === 'desc' ? -1 : 1,
  });

  const contactsCount = await ContactCollection.countDocuments(filter);

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({
    _id: contactId,
    userId,
  });
  console.log('Fetched Contact:', contact);
  return contact;
};

export const getCreateContact = async (payload) => {
  const { phoneNumber, email, userId } = payload;

  const existingContact = await ContactCollection.findOne({
    userId,
    $or: [{ phoneNumber }, { email }],
  });

  if (existingContact) {
    throw createHttpError(
      409,
      'Contact with this phone number or email already exists',
    );
  }

  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const getDeleteContact = async (filter) => {
  const contact = await ContactCollection.findOneAndDelete(filter);
  return contact;
};
