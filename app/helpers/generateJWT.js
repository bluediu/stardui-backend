const jwt = require('jsonwebtoken');

const generateJWT = (
  uid = '',
  name,
  img = '',
  role = '',
  google
) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, img, role, google };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '192h',
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
