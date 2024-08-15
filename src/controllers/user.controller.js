import UserModel from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinaryUploader from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password, avatar, coverImg } = req.body;
  //  normal life :
  // if (!username && !email && !password && !avatar) {
  //     throw new ApiError(400, "data thik se add kro Boss!");
  //   }
  console.log(req.body);
  // chai lover life :
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, `${field} is required`);
  }

  /* 
    // normal life:
  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    throw new ApiError(400, "aap to jaake login kro !");
  }
  */
  // chai lover life :
  console.log(UserModel);
  const isUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUser) {
    throw new ApiError(409, "this email or username is already in use!");
  }

  // req.file or req.files is added by the multer to handle those files
  // getting local path of images, which are uploaded via multer
  const coverImgLocalPath = req.files?.coverImg[0]?.path;
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400,"avatar is required boss!")
  }

  const avatarUploaded = await cloudinaryUploader(avatarLocalPath);
  const coverImgUploaded = await cloudinaryUploader(coverImgLocalPath)
  if(!avatarUploaded) throw new ApiError(500,"something is going wrong with avatar, not uploaded!")
    
  const user = await UserModel.create({
    fullName,
    username,
    email,
    password,
    avatar:avatarUploaded.url,
    coverImg:coverImgUploaded?.url || "https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296_1280.jpg",
  })

  const savedUser = await UserModel.findById(user._id).select("-password -refreshToken")
  if(!savedUser){
    throw new ApiError(500,"Error in the registeration process!")
  }
  console.log(req.files);
  console.log(req.files?.avatar);

});

/*
steps to register new user : 
# get details from the user
# validate the details - if empty or other
# check user if already or new
# check image and avatar and upload to cloudinary
# create user object - create entry in DB
# check for user creation
# return response
*/
return res.status(201).json(
  new ApiResponse(200,savedUser, "user registered successfully")
)
export default registerUser;
