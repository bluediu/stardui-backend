/* Core */
import { request, response } from 'express';

/* Models */
import { CategoryModel } from '../models/index.js';

/* Helpers */
import { handleError } from '../helpers/index.js';

export const listCategories = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    CategoryModel.countDocuments(query).limit(+limit),
    CategoryModel.find(query).skip(+from).limit(+limit),
  ]);

  return res.json({ total, categories });
};

export const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);

  return res.json(category);
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryExists = await CategoryModel.findOne({ name });

  if (categoryExists)
    return handleError({ res, msg: `Category: ${name} already exists.` });

  // Create raw data.
  const data = { name, user: req.user._id };

  const category = await new CategoryModel(data);

  await category.save();

  return res.status(201).json(category);
};

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;

  // eslint-disable-next-line no-unused-vars
  const { user, state, ...rest } = req.body;

  rest.name = rest.name.toUpperCase();
  rest.user = req.user._id;

  const category = await CategoryModel.findByIdAndUpdate(id, rest, {
    new: true,
  });

  return res.json(category);
};

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  return res.json(category);
};
