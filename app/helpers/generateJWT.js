const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', name, img = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, img };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('it could not generate jwt');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
