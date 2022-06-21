const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * It takes an idToken, verifies it with Google, and returns the user's name, email, and profile
 * picture.
 * @param {string} idToken - The token that you get from the client side.
 * @returns An object with the name, img, and email of the user.
 */
const googleVerify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture: img } = ticket.getPayload();

  return { name, img, email };
};

module.exports = { googleVerify };
