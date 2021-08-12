const { response } = require('express');
const { Category } = require('../models');

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

module.exports = {
  createCategory,
};
