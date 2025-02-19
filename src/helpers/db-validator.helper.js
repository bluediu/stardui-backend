/* Models */
import { RoleModel, UserModel } from '../models';

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
