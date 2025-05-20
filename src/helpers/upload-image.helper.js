/* eslint-disable jsdoc/no-undefined-types */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Uploads a new image to Cloudinary, deleting the old one if provided.
 *
 * @param {object}   options
 * @param {Express.Multer.File} options.file  The uploaded file object (expects .tempFilePath)
 * @param {string?}  options.existingImageUrl The full URL of the old image (or null/'NO_IMG')
 * @param {string}   options.folderName       The Cloudinary folder (no leading slash)
 * @returns {Promise<string>}                 The secure URL of the newly uploaded image
 */
export async function uploadImageCloudinary({
  file,
  existingImageUrl,
  folderName,
}) {
  if (existingImageUrl && existingImageUrl !== 'NO_IMG') {
    const segments = existingImageUrl.split('/');
    const fileName = segments.pop(); // e.g. "abc123.jpg"
    const [publicId] = fileName.split('.'); // e.g. "abc123"
    await cloudinary.uploader.destroy(`${folderName}/${publicId}`, {
      resource_type: 'image',
    });
  }

  const { tempFilePath } = file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    folder: folderName,
  });

  return secure_url;
}
