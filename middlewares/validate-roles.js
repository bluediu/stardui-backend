const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'you want verify role without validate the token first',
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not administrator - it can not do this`,
    });
  }

  next();
};

const itHasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'you want verify role without validate the token first',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service require one of these role ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, itHasRole };
