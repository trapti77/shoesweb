import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the file type
    });

    // Use fs.promises.unlink to delete the file asynchronously
    await fs.promises.unlink(localFilePath);

    console.log("File successfully uploaded to Cloudinary:", response.url);
    return response;
  } catch (error) {
    console.error("Error during file upload:", error);

    // Attempt to delete the local file in case of failure
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
