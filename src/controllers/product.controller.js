/* Core */
import { request, response } from 'express';

/* Models */
import { ProductModel } from '../models/index.js';

/* Helpers */
import { handleError } from '../helpers/index.js';

export const listProducts = async (req = request, res = response) => {
  try {
    // Params
    const { page = 1, perPage = 6 } = req.query;
    const query = { state: true };

    // Convert data types
    const currentPage = +page;
    const itemsPerPage = +perPage;

    const offset = (currentPage - 1) * itemsPerPage;

    // Define products QuerySet in one query.
    const [total, products] = await Promise.all([
      ProductModel.countDocuments(query),
      ProductModel.find(query)
        .skip(+offset)
        .limit(+itemsPerPage)
        .populate('user', 'name')
        .populate('category', 'name'),
    ]);

    return res.json({
      total,
      page: currentPage,
      itemsPerPage,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, products: [] });
  }
};

export const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  return res.json(product);
};

export const getProductsByCategory = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const [total, products] = await Promise.all([
      ProductModel.countDocuments({ category: id, state: true }),
      ProductModel.find({ state: true }).where({ category: id }),
    ]);

    return res.json({ total, products });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, products: [] });
  }
};

// eslint-disable-next-line no-unused-vars
export const getLatestProducts = async (req = request, res = response) => {
  try {
    const products = await ProductModel.find({ state: true })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, products: [] });
  }
};

export const createProduct = async (req = request, res = response) => {
  const { name, ...rest } = req.body;

  const productExists = await ProductModel.findOne({ name });

  if (productExists)
    return handleError({ res, msg: `Category: ${name} already exists.` });

  // Create raw data.
  const data = {
    ...rest,
    name: name.toUpperCase(),
    user: req.user._id,
  };

  const product = await new ProductModel(data);

  await product.save();

  return res.status(201).json(product);
};

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;

  // eslint-disable-next-line no-unused-vars
  const { _id, user, ...rest } = req.body;

  if (rest.name) rest.name = rest.name.toUpperCase();

  rest.user = req.user._id;

  const product = await ProductModel.findByIdAndUpdate(id, rest, {
    new: true,
  });

  return res.json(product);
};

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await ProductModel.findByIdAndUpdate(
    id,
    { state: false, available: false },
    { new: true }
  );

  return res.json(product);
};
