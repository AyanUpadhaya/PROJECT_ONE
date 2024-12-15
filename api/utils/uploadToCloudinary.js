const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getDataUri = require("./datauri");

const uploadToCloudinary = async (req) => {
  if (!req.files || !req.files.file || req.files.file.length === 0) {
    throw new Error("No file uploaded");
  }
  const fileName = req.files.file[0].filename;
  try {
    const file = req.files.file[0];
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const finalOuput = cloudResponse.secure_url;
    return [finalOuput, fileName];
  } catch (error) {
    console.log(error);
    logger.error(error.message || "Failed to upload cloudinary");
  }
};

module.exports = uploadToCloudinary;
