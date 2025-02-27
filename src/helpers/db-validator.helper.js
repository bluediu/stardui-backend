/* Models */
import {
  RoleModel,
  UserModel,
  CategoryModel,
  ProductModel,
} from '../models/index.js';

/* Roles */
export const validateRoleExists = async (role = '') => {
  const roleExists = await RoleModel.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role: ${role} is not registered in the DB`);
  }
};

/* Users */
export const checkEmailAvailability = async (email = '') => {
  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    throw new Error(`The email: ${email} is already taken, please try another`);
  }
};

export const validateUserExistsById = async (id) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error(`User with ID ${id} does not exist.`);
  }
};

/* Categories */
export const validateCategoryExistsById = async (id) => {
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new Error(`Category with ID ${id} does not exist.`);
  }
};

/* Products */
export const validateProductExistsById = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error(`Product with ID ${id} does not exist.`);
  }
};
