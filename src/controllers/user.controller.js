/* Core */
import { request, response } from 'express';

/* Libs */
import bcryptjs from 'bcryptjs';

/* Models */
import { UserModel } from '../models/index.js';

/* Helpers */
import { generateJWT } from '../helpers/index.js';

const _encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();

  return bcryptjs.hashSync(password, salt);
};

export const listUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query).limit(+limit),
    UserModel.find(query).skip(+from).limit(+limit),
  ]);

  return res.json({ total, users });
};

export const createUser = async (req = request, res = response) => {
  const user = new UserModel(req.body);

  // Encrypt password
  const rawPassword = req.body.password;
  user.password = _encryptPassword(rawPassword);

  // Save user
  await user.save();

  // Generate JWT
  const token = await generateJWT(user.id, user.name, user.img);

  return res.status(201).json({ user, token });
};

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params;

  // eslint-disable-next-line no-unused-vars
  const { _id, password, google, email, ...rest } = req.body;

  if (password) rest.password = _encryptPassword(password);

  const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });

  return res.json(user);
};

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  return res.json(user);
};
