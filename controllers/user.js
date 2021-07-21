const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
  const params = req.query;

  res.json({
    msg: 'GET - controller',
    params,
  });
};

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // verificate if the email exist
  const doesEmailExist = await User.findOne({ email });

  if (doesEmailExist) {
    return res.status(400).json({
      msg: 'That email already was taken, please try another',
    });
  }

  // encrypt the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save data in mongodb
  await user.save();

  res.json({
    user,
  });
};

const putUsers = (req = request, res) => {
  const id = req.params.id;

  res.json({
    msg: 'PUT',
    id,
  });
};

const patchUsers = (req, res) => {
  res.json({
    msg: 'PATCH',
  });
};

const deleteUser = (req, res) => {
  res.json({
    msg: 'DELETE',
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUser,
};
