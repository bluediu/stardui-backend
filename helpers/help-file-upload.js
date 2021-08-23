const path = require('path');
const { v4: uuidv4 } = require('uuid');

const helpFileUpload = (
  files,
  validExtension = ['png', 'jpg', 'jpeg', 'gif'],
  folder = ''
) => {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    const { file } = files;
    const shortName = file.name.split('.');
    const extension = shortName[shortName.length - 1];

    if (!validExtension.includes(extension)) {
      return reject(
        `The extension ${extension} is not valid, the  allowed extensions are ${validExtension}`
      );
    }

    const tempName = `${uuidv4()}.${extension}`;

    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      folder,
      tempName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(tempName);
    });
  });
};

module.exports = { helpFileUpload };
