import userModel from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinaryUploader from "../utils/cloudinary.js";
import envConfig from "../../config/envConfig.js";
import jwt from "jsonwebtoken";
const generateTokens = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens!");
  }
};

/*
steps to register new user : 
- get details from the user
- validate the details - if empty or other
- check user if already or new
- check image and avatar and upload to cloudinary
- create user object - create entry in DB
- check for user creation
- remove the password and refreshToken from the user object and send this as a response.
- return response
*/

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  //  normal life :
  // if (!username && !email && !password && !avatar) {
  //     throw new ApiError(400, "data thik se add kro Boss!");
  //   }

  // chai lover life :
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, `${field} is required`);
  }

  /* 
    // normal life:
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    throw new ApiError(400, "aap to jaake login kro !");
  }
  */

  // chai lover life :
  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUser) {
    throw new ApiError(409, "this email or username is already in use!");
  }

  // req.file or req.files is added by the multer to handle those files
  // getting local path of images, which are uploaded via multer

  // const coverImgLocalPath = req.files?.coverImg[0]?.path;
  const coverImgLocalPath = req.files.coverImg
    ? req.files?.coverImg[0]?.path
    : null;
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required boss!");
  }
  console.log(req.files);

  const avatarUploaded = await cloudinaryUploader(avatarLocalPath);
  const coverImgUploaded = coverImgLocalPath
    ? await cloudinaryUploader(coverImgLocalPath)
    : {
        url: "https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296_1280.jpg",
      };
  if (!avatarUploaded)
    throw new ApiError(
      500,
      "something is going wrong with avatar, not uploaded!"
    );

  const user = await userModel.create({
    fullName,
    username,
    email,
    password,
    avatar: avatarUploaded.url,
    coverImg: coverImgUploaded.url,
  });

  const savedUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken");
  if (!savedUser) {
    throw new ApiError(500, "Error in the registeration process!");
  }
  res
    .status(201)
    .json(new ApiResponse(200, savedUser, "user registered successfully"));
});

/*
**steps to login a user :** 
- get details from the user
- validate the details - if empty or other
- check user if already or new
- if yes :- compair the password and username fields; else :- Throw Error 
- respond as program say true :- set Tokens ; else :- reject the request 

- check for user creation
- return response
*/

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(409, "Please fillup the form properly");
  }
  const existedUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!existedUser) {
    throw new ApiError(401, "User is not registered, please register first!");
  }

  const isAuthenticated = await existedUser.isPasswordOk(password);
  if (!isAuthenticated) {
    throw new ApiError(401, "invalide credetials while login! ");
  }
  const { accessToken, refreshToken } = await generateTokens(existedUser._id);
  const logedinUser = await userModel
    .findById(existedUser._id)
    .select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .user(logedinUser)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(201, "login is done properly.", {
        user: logedinUser,
        refreshToken,
        accessToken,
      })
    );
});

/*
**steps to logout a user :** 
- remove the refreshToken from db
- empty out the cookies for accessToken and refreshTokens
- and all set...
*/

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  await userModel.findByIdAndUpdate(
    user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "successfully logout", {}));
});

export { registerUser, loginUser, logoutUser };
