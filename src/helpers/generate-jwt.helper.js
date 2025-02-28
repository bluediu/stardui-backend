import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) with the provided user details.
 *
 * @param {{uid:string, name:string, img:string, role:string, email:string, google:boolean }} user - Indicates if the user authenticated via Google.
 * @returns {Promise<string>} A promise that resolves to the generated JWT token.
 */
export const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
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
