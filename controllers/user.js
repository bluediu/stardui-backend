const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encrypt the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save data in mongodb
  await user.save();

  res.json(user);
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // encrypt the password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const patchUsers = (req, res) => {
  res.json({
    msg: 'PATCH',
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // delete document from mongodb
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, {
    state: false,
  });

  res.json(user);
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUser,
};
