const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const query = { state: true };

    const size = Number(limit);
    const skip = (page - 1) * size;

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .skip(skip)
        .limit(size)
        .populate('user', 'name')
        .populate('category', 'name'),
    ]);

    return res.json({
      total,
      limit,
      page,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      products: [],
    });
  }
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
