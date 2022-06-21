const jwt = require('jsonwebtoken');

/**
 * It takes in a user's information and returns a JWT token
 * @param {string} uid - user id
 * @param {string} name - user's name
 * @param {string} img - the user's profile image
 * @param {string} role - 'ADMIN_ROLE'
 * @param {string} google - true/false
 * @returns A promise that resolves to a token.
 */
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
