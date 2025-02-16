import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) with the provided user details.
 *
 * @param {string} uid - The unique user identifier.
 * @param {string} name - The name of the user.
 * @param {string} img - The image of the user.
 * @param {string} role - The role of the user (default is an empty string).
 * @param {string} email - The email of the user.
 * @param {boolean} google - Indicates if the user authenticated via Google.
 * @returns {Promise<string>} A promise that resolves to the generated JWT token.
 */
export const generateJWT = (
  uid = '',
  name,
  img = '',
  role = '',
  email = '',
  google
) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, img, role, email, google };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '192h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to generate JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};
