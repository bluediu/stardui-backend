/* Core */
import { request, response } from 'express';

/* Libs */
import bcryptjs from 'bcryptjs';

/* Models */
import { UserModel } from '../models/index.js';

/* Helpers */
import {
  generateJWT,
  removeImageCloudinary,
  uploadImageCloudinary,
} from '../helpers/index.js';

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
  const token = await generateJWT({
    uid: user.id,
    name: user.name,
    email: user.email,
    img: user.img,
    role: user.role,
    google: user.google,
  });

  return res.status(201).json({ user, token });
};

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params;

  const googleUser = req.user.google;
  if (googleUser)
    return res.status(400).json({
      msg: 'Google users cannot update their information',
    });

  // eslint-disable-next-line no-unused-vars
  const { _id, password, google, ...rest } = req.body;

  if (password) rest.password = _encryptPassword(password);

  const canChangeImage = !googleUser && req.files?.img;

  if (canChangeImage) {
    rest.img = await uploadImageCloudinary({
      file: req.files.img,
      existingImageUrl: req.user.img,
      folderName: 'stardiu/users',
    });
  }

  const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });

  return res.json(user);
};

export const deleteUserImage = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) return res.status(404).json({ msg: 'User not found' });

  await removeImageCloudinary({
    existingImageUrl: user.img,
    folderName: 'stardiu/users',
  });

  await UserModel.findByIdAndUpdate(id, { img: 'NO_IMG' }, { new: true });

  return res.json({ ok: true, msg: 'Image deleted successfully' });
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
