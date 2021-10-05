const validateFile = (req, res, next) => {
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !req.files.file
  ) {
    return res
      .status(400)
      .json({ msg: 'There are not files to upload' });
  }

  return next();
};

module.exports = {
  validateFile,
};
