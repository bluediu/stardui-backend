/* Core */
import { response } from 'express';

/* Libs */
import bcryptjs from 'bcryptjs';

/* Models */
import { UserModel } from '../models';

/* Helpers */
import { generateJWT, handleError } from '../helpers';

export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Check email existence.
    const user = await UserModel.findOne({ email });

    if (!user) return handleError({ res, msg: 'User not found' });

    if (!user.state) return handleError({ res, msg: 'Invalid user' });

    // // Check and validate password
    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      return handleError({ res, msg: 'Email or password incorrect' });
    }

    // // Generate JWT
    const token = await generateJWT(
      user.id,
      user.name,
      user.img,
      user.role,
      user.google
    );

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    return handleError({
      res,
      code: 500,
      msg: err.message || 'Server error :(',
    });
  }
};

export const renewToken = async (req, res = response) => {
  try {
    const { user } = req;

    // Generate JWT
    const token = await generateJWT(
      user.id,
      user.name,
      user.img,
      user.role,
      user.google
    );

    return res.json({ ok: true, token });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return handleError({ res, code: 500, msg: 'Invalid token' });
  }
};
