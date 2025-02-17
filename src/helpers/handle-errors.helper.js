/**
 * Sends a standardized error response.
 *
 * @param {Object} params - The parameters for handling the error.
 * @param {import('express').Response} params.res - Express response object.
 * @param {number} [params.code=400] - HTTP status code for the response (default: 400).
 * @param {string} [params.msg='Server error'] - Error message to send in the response (default: 'Server error').
 * @returns {import('express').Response} JSON response with error status and message.
 */
export const handleError = ({ res, code = 400, msg = 'Server error' }) =>
  res.status(code).json({ ok: false, msg });
