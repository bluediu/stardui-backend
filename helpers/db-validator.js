const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
  isValidRole,
  doesEmailExist,
  doesUserExistById,
};
