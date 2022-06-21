/* libs */
const { response, request } = require('express');

/* Models */
const { Category } = require('../models');

/* == GET == */
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(from)
      .limit(Number(limit))
      .populate('user', 'name'),
  ]);

  return res.json({
    total,
    categories,
  });
};

const getCategoryById = async (
  req = request,
  res = response
) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate(
    'user',
    'name'
  );

  return res.json(category);
};

/* == CREATE == */

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    res.status(400).json({
      msg: `Category ${categoryDB.name}, already exist`,
    });
  }

  // generate data to save
  const data = {
    name,
    user: req.user._id,
  };

  const category = await new Category(data);

  // save in DB
  await category.save();

  res.status(201).json(category);
};

/* == UPDATE == */

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, state, ...rest } = req.body;

  rest.name = rest.name.toUpperCase();
  rest.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, rest, {
    new: true,
  });

  return res.json(category);
};

/* == DELETE == */
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  );

  return res.json(category);
};

module.exports = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};
