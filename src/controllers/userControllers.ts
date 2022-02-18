import generateToken from "@src/utils/generateToken";
import express, { Request } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
export interface CustomRequest extends Request {
  currentUser?: any;
}
export const registerUser = asyncHandler(async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const new_user = new User({ name, email, password });
  await new_user.save();

  res.send({
    name: new_user.name,
    email: new_user.email,
    token: generateToken(new_user._id),
  });
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

// ================================

export const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: express.Response) => {
    const user = req.currentUser;
    res.send(user);
  }
);
