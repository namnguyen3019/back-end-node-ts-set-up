import generateToken from "@src/utils/generateToken";
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
export const registerUser = asyncHandler(async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const new_user = new User({ name, email, password });
  await new_user.save();
  res.send(`Create a new user: ${name}`);
});

export const loginUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.send("User not found");
    }
    //   Check password
    const isPasswordMatch = await user.checkPassword(password);
    if (isPasswordMatch) {
      //   Return information and token
      res.send({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.send(`password do not match`);
    }
  }
);

export const getUserProfile = asyncHandler(async (req: any, res: any) => {
  res.send("Get profile");
});
