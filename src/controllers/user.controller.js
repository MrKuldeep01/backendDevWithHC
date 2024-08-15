import UserModel from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

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

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(req.files);
  console.log(req.files?.avatar);
  console.log(username, "aap register kr skte he aaiA...");

  //   UserModel.create({
  //     username, email, fullName
  //   })
  res.status(303).json({
    message: "we are working on this...",
  });
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

export default registerUser;
