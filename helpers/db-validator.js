const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const doesRoleExist = await Role.findOne({ role });
  if (!doesRoleExist) {
    throw new Error(`Role: ${rol} is not register in the DB`);
  }
};

module.exports = {
  isValidRole,
};
