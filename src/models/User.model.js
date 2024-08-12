import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
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
      type: String,  //cloudnery url
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
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);
userSchema.pre("save",async function(next){
    this.password = bcrypt.hash(this.password,12)
    next()
})
export default mongoose.model("User", userSchema);
