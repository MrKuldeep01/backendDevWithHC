import dotenv from "dotenv";
dotenv.config();

const dbUri = String(process.env.DB_URI);
const port = String(process.env.PORT);
const corsOrigin = String(process.env.CORS_ORIGIN);
const accessTokenPrivateKey = String(process.env.ACCESS_PRIVATE_KEY);
const refreshTokenPrivateKey = String(process.env.REFRESH_PRIVATE_KEY);
const accessTokenExpiry = String(process.env.ACCESS_EXPIRY);
const refreshTokenExpiry = String(process.env.REFRESH_EXPIRY);
const cloudinaryName = String(process.env.CLOUDINARY_NAME);
const cloudinaryApiKey = String(process.env.CLOUDINARY_API_KEY);
const cloudinaryApiSecret = String(process.env.CLOUDINARY_API_SECRET);
export default {
  dbUri,
  port,
  corsOrigin,
  accessTokenPrivateKey,
  refreshTokenPrivateKey,
  accessTokenExpiry,
  refreshTokenExpiry,
  cloudinaryName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
};
