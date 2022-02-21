const path = require('path');
const fs = require('fs');

const { response } = require('express');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { helpFileUpload } = require('../helpers');

const { User, Product } = require('../models');

// files in local storage
const fileUpload = async (req, res = response) => {
  try {
    const name = await helpFileUpload(
      req.files,
      undefined,
      'imgs'
    );

    return res.json({
      name,
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

// update files from local storage
// eslint-disable-next-line consistent-return
const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist an user with the id: ${id}`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist a product with the id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Upps' });
  }

  // clean previous images
  if (model.img) {
    // delete the image of the server
    const imgPath = path.join(
      __dirname,
      '../uploads',
      collection,
      model.img
    );

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  try {
    const name = await helpFileUpload(
      req.files,
      undefined,
      collection
    );

    model.img = name;

    await model.save();

    return res.json(model);
  } catch (err) {
    return res.json({
      ok: false,
      msg: 'Error to upload the image',
    });
  }
};

// eslint-disable-next-line consistent-return
const updateImageCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist an user with the id: ${id}`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist a product with the id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Upps' });
  }

  if (model.img) {
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(
    tempFilePath,
    { folder: `stardiu/${collection}` }
  );

  model.img = secure_url;

  await model.save();

  return res.json(model);
};

// eslint-disable-next-line consistent-return
const showImage = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist an user with the id: ${id}`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Not exist a product with the id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Upps' });
  }

  // clean previous images
  if (model.img) {
    // there is that delete the image of the server
    const imgPath = path.join(
      __dirname,
      '../uploads',
      collection,
      model.img
    );

    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  }

  const imgPath = path.join(
    __dirname,
    '../assets',
    'no-image.jpg'
  );

  return res.sendFile(imgPath);
};

module.exports = {
  fileUpload,
  updateImage,
  updateImageCloudinary,
  showImage,
};
