/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();

  return data;
};

export const CategoryModel = model('Category', CategorySchema);
