/**
 * If there are no files, or the file object is empty,
 * or there is no file object,
 * return a 400 error.
 *
 * If there are files, continue to the next middleware.
 * @param {request} req - The request object.
 * @param {response} res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns the next() function.
 */
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
