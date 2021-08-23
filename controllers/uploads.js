const { response } = require('express');
const { helpFileUpload } = require('../helpers');

const fileUpload = async (req, res = response) => {
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !req.files.file
  ) {
    return res
      .status(400)
      .json('The are not files in the request');
  }

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

module.exports = {
  fileUpload,
};
