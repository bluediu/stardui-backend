/* Core */
import { response } from 'express';

/* Libs */
import bcryptjs from 'bcryptjs';

/* Models */
import { UserModel } from '../models/index.js';

/* Helpers */
import { generateJWT, googleVerify, handleError } from '../helpers/index.js';

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
    const token = await generateJWT({
      uid: user.id,
      name: user.name,
      email: user.email,
      img: user.img,
      role: user.role,
      google: user.google,
    });

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

export const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    let user = await UserModel.findOne({ email });

    // Check if the user exists, if it does not exist register it.
    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
      };

      user = new UserModel(data);
      await user.save();
    }

    if (!user.state) {
      // Forbidden action! Unauthorized user.
      return handleError({ res, code: 401, msg: 'Invalid user' });
    }

    // Generate JWT
    const token = await generateJWT({
      uid: user.id,
      name: user.name,
      email: user.email,
      img: user.img,
      role: user.role,
      google: user.google,
    });

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    return handleError({
      res,
      code: 500,
      msg: `${error.message}, auth token is not valid.`,
    });
  }
};

export const renewToken = async (req, res = response) => {
  try {
    const { user } = req;

    // Generate JWT
    const token = await generateJWT({
      uid: user.id,
      name: user.name,
      email: user.email,
      img: user.img,
      role: user.role,
      google: user.google,
    });

    return res.json({ ok: true, user, token });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return handleError({ res, code: 500, msg: 'Invalid token' });
  }
};
