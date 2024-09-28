import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: ['personal', 'home'],
      required: true,
    },
    // createdAt: {
    //   type: String,
    //   required: true,
    // },
    // updatedAt: {
    //   type: String,
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true },
);
export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];
const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
