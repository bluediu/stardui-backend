const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(from)
      .limit(Number(limit))
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);

  return res.json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  return res.json(product);
};

const createProduct = async (req, res = response) => {
  const { state, user, ...rest } = req.body;

  const productDB = await Product.findOne({ name: rest.name });

  if (productDB) {
    res.status(400).json({
      msg: `The product ${productDB.name}, already exist`,
    });
  }

  // generate data to save
  const data = {
    ...rest,
    name: rest.name.toUpperCase(),
    user: req.user._id,
  };

  const product = await new Product(data);

  // save in DB
  await product.save();

  res.status(201).json(product);
};

const putProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, state, ...rest } = req.body;

  if (rest.name) {
    rest.name = rest.name.toUpperCase();
  }

  rest.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, rest, {
    new: true,
  });

  return res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  );

  return res.json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
};
