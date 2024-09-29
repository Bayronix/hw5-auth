import { Schema, model } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [ROLES.USER, ROLES.ADMIN],
      default: ROLES.USER,
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

  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const userCollection = model('user', userSchema);

export default userCollection;
