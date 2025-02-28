import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies a Google ID token and extracts user information.
 *
 * @param {string} idToken - The Google ID token to verify.
 * @returns {Promise<{name: string, email: string, img: string}>}
 * An object containing the user's name, email, and profile image.
 * @throws {Error} If the token is invalid or verification fails.
 */
export const googleVerify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture: img } = ticket.getPayload();

  return { name, email, img };
};
