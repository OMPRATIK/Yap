import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/index.js";
import User from "../models/user.model.js";

import createToken from "../utils/createToken.util.js";
import cloudianry from "../utils/cloudinary.util.js";

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const newUser = await User.create({ fullName, email, password });
  createToken(newUser._id, res);
  res.status(StatusCodes.CREATED).json({
    _id: newUser._id,
    fullName,
    email,
    profilePic: newUser.profilePic,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  createToken(user._id, res);
  res.status(StatusCodes.OK).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
  });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });

  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    throw new BadRequestError("Please provide profile picture");
  }

  const uplodadedProfilePic = await cloudianry.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePic: uplodadedProfilePic.secure_url,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    profilePic: updatedUser.profilePic,
  });
};

export const checkAuth = (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};
