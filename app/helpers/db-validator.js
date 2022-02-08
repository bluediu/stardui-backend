const Role = require('../models/role');
const { User, Category, Cart, Product } = require('../models');

const isValidRole = async (role = '') => {
  const doesRoleExist = await Role.findOne({ role });
  if (!doesRoleExist) {
    throw new Error(`Role: ${role} is not register in the DB`);
  }
};

const doesEmailExist = async (email = '') => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(
      `That email: ${email}, already was taken, please try another`
    );
  }
};

const doesUserExistById = async (id) => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new Error(`Id not exists: ${id}`);
  }
};

/*
 Categories
*/
const doesCategoryExistById = async (id) => {
  const categoryExist = await Category.findById(id);

  if (!categoryExist) {
    throw new Error(`Id not exists: ${id}`);
  }
};

/*
 Products
*/
const doesProductExistById = async (id) => {
  const productExist = await Product.findById(id);

  if (!productExist) {
    throw new Error(`Id not exists: ${id}`);
  }
};

/* validate collections */

const allowedCollections = (collection, collections = []) => {
  const include = collections.includes(collection);

  if (!include) {
    throw new Error(
      `Collection ${collection} is not valid - ${collections}`
    );
  }
  return true;
};

module.exports = {
  allowedCollections,
  doesCategoryExistById,
  doesEmailExist,
  doesProductExistById,
  doesUserExistById,
  isValidRole,
};
