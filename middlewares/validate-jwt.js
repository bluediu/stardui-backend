const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (
  req = request,
  res = response,
  next
) => {
  const token = req.header('x-token');

  if (!token) {
    return res.json({
      msg: 'There is not token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(
      token,
      process.env.SECRETORPRIVATEKEY
    );

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }

    // verify if the uid it has state in false
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
