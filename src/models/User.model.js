import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import envConfig from "../../config/envConfig.js";
import ApiError from "../utils/ApiError.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnery url
      required: true,
    },
    coverImg: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required !!!"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [{
      type: Schema.Types.ObjectId,
      ref: "Video",
    }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// adding custom methods in mongodb schema =========
// syntax
// userSchema.methods.methodName()=>{}

userSchema.methods.isPasswordOk = async function (password) {
  /*  
  for comparing the password with hash that is stored in db first is actual String password passed by the user and second is the hash saved in the data base.
  bcrypt.compare("password", sdghkfegnxcchjsrtfvnserfhzdjdfudcjdfu )*/
  return await bcrypt.compare(password, this.password);
};

/* jwt setup need some env variable like : secrate key, expiring date etc. */

userSchema.methods.generateAccessToken = async function () {
  jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
    },
    envConfig.accessTokenPrivateKey,
    {
      expiresIn: envConfig.accessTokenExpiry,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  jwt.sign(
    {
      _id: this._id,
    },
    envConfig.refreshTokenPrivateKey,
    {
      expiresIn: envConfig.refreshTokenExpiry,
    }
  );
};

export default mongoose.model("User", userSchema);
