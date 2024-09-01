import envConfig from "../../config/envConfig";
import UserModel from "../models/User.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const authUser = asyncHandler(async (req, _, next) => {
 try {
   const accessToken =
     req.cookies?.accessToken ||
     req.header("Authorization")?.replace("Bearer ", "");
   if (!accessToken) {
     throw new ApiError(401, "unauthorized user");
   }
 
   const tokenData = jwt.verify(accessToken, envConfig.accessTokenPrivateKey);
   const user = await UserModel.findById(tokenData?._id).select("-password -refreshToken")
   if(!user){
     throw new ApiError(401,"invalid access token!")
   }
 
   req.user = user;
   next();
 
 } catch (error) {
  throw new ApiError(400,error?.message || "unautorized user access!")
  
 }
});
