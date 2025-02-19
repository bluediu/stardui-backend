import { handleError } from '../helpers';

export const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return handleError({
      res,
      code: 500,
      msg: 'Token validation is required before checking the role.',
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return handleError({
      res,
      code: 403,
      msg: `Access denied: ${name} is not an administrator.`,
    });
  }

  next();
};

export const hasRequiredRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Role verification failed: Token must be validated first.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `Access denied: Required roles are ${roles.join(', ')}.`,
      });
    }

    return next();
  };
};
