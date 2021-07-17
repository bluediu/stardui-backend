const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  const params = req.query;

  res.json({
    msg: 'GET - controller',
    params,
  });
};

const postUsers = (req, res) => {
  const body = req.body;

  res.json({
    msg: 'POST',
    body,
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
