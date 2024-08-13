import envConfig from "../../config/envConfig";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function cloudinaryUploader(fileLink) {
  try {
    if (!fileLink) return null;

    // upload the file on cloudinary
    const uploadFile = await cloudinary.uploader.upload(fileLink, {
      resource_type: "auto",
    });
    //if uploaded successful
    console.log("file is uploaded ", uploadFile);
    return uploadFile;
  } catch (error) {
    fs.unlinkSync(fileLink);
    return null;
  }
}

cloudinary.config({
  cloud_name: envConfig.cloudinaryName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret, // Click 'View API Keys' above to copy your API secret
});
