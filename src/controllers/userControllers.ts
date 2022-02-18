import generateToken from "@src/utils/generateToken";
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

// @desc user registation
// @route get api/users/register
// @access public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
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
      token: generateToken(new_user._id?.toString() as string),
    });
  }
);

// @desc user login
// @route get api/users/login
// @access public
export const loginUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.send("User not found");
    }
    const isPasswordMatch = await user?.checkPassword(password);
    if (isPasswordMatch) {
      res.send({
        _id: user?._id,
        email: user?.email,
        token: generateToken(user?._id?.toString() as string),
      });
    } else {
      res.send(`password do not match`);
    }
  }
);

// @desc current user profile
// @route get api/users/profile
// @access Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: express.Response) => {
    const user = req.currentUser;
    res.send(user);
  }
);
