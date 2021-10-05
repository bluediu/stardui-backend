const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const allowedCollections = [
  'categories',
  'products',
  'roles',
  'users',
];

const searchUsers = async (term = '', res = response) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const user = await User.findById(term);

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  return res.json({
    results: users,
  });
};

const searchProducts = async (term = '', res = response) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const product = await Product.findById(term).populate(
      'category',
      'name'
    );

    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({
    name: regex,
    state: true,
  }).populate('category', 'name');

  return res.json({
    results: products,
  });
};

const searchCategories = async (term = '', res = response) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const category = await Category.findById(term);

    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({
    name: regex,
    state: true,
  });

  return res.json({
    results: categories,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collection are ${allowedCollections}`,
    });
  }

  switch (collection) {
    case 'users':
      return searchUsers(term, res);

    case 'categories':
      return searchCategories(term, res);

    case 'products':
      return searchProducts(term, res);

    default:
      return res.status(500).json({
        msg: 'NOOOOOOOOO',
      });
  }
};

module.exports = {
  search,
};
